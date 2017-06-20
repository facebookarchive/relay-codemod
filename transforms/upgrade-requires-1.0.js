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
  const collection = j(file.source);
  const printOptions =
    options.printOptions || {quote: 'single', trailingComma: true};

  collection
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value === 'react-relay')
    .forEach(path => {
      path.value.source.value = 'react-relay/classic';
    });

  collection
    .find(j.CallExpression)
    .filter(path =>
      path.value.callee.name === 'require' &&
      path.value.arguments[0] &&
      path.value.arguments[0].value === 'react-relay'
    )
    .forEach(path =>
      path.value.arguments[0].value = 'react-relay/classic'
    );

  return collection.toSource(printOptions);
};
