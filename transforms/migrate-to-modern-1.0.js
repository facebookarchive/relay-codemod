/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const printOptions =
    options.printOptions || {quote: 'single', trailingComma: true};

  const RELAY_REQUIRE =  /(\w+) Relay = require\(\'react-relay\/classic\'\);/;
  const RELAY_IMPORT = /import Relay from \'react-relay\/classic\';/;

  let source = file.source;

  // Currently only handles upgrading fragment containers, bail if none found
  if (source.search('Relay.createContainer') < 0) {
    return source;
  }

  // update requires or imports
  if (source.search(RELAY_REQUIRE) >= 0) {
    source = source.replace(
      RELAY_REQUIRE,
      '$1 {\n' +
      '  createFragmentContainer,\n' +
      '  graphql,\n' +
      '} = require(\'react-relay/compat\');'
    );
  } else if (source.search(RELAY_IMPORT) >= 0) {
    source = source.replace(
      RELAY_IMPORT,
      'import {\n' +
      '  createFragmentContainer,\n' +
      '  graphql,\n' +
      '} from \'react-relay/compat\';'
    );
  } else {
    // Does not meet current assumptions, skip
    return source;
  }

  // update getFragment calls
  source = source.replace(
    /\$\{(\w+).getFragment\('(\w+)'\)\}/g,
    '...$1_$2'
  );

  // add warning to props.relay
  source = source.replace(
    /(^.*props\.relay)/gm,
    '// TODO props.relay.* APIs do not exist on compat containers\n$1'
  );

  // add warning to setVariables
  source = source.replace(
    /(^.*setVariables)/gm,
    '// TODO needs manual handling\n$1'
  );

  source = j(source)
    .find(j.CallExpression)
    .filter(p =>
      p.node.callee.type === 'MemberExpression' &&
      p.node.callee.object.name === 'Relay'
    ).forEach(p => {
      p.node.callee = j.identifier('createFragmentContainer');
      const comments = [];
      let fragments;
      const spec = p.node.arguments[1];
      spec.properties.forEach(prop => {
        if (prop.key.name === 'fragments') {
          fragments = prop.value;
        } else {
          comments.push(
            j.commentBlock(
              ' TODO manually deal with:\n' +
              j(prop).toSource() +
              '\n'
             )
          );
        }
      });
      p.node.arguments[1] = fragments;
      fragments.properties[0].comments = comments;
    }).toSource(printOptions);

  const match = file.path.match(/(\w+)\./);
  const moduleName = match && match[1] || 'UNKNOWN';

  // add fragment names
  source = source.replace(
    /\b(\w+): \(\w*\) => Relay\.QL(\s*)`\n( +)fragment( \w+)? on/g,
    '$1: graphql`\n$2$3fragment ' + moduleName + '_$1 on'
  );

  return source;
};
