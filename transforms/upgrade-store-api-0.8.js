/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const NEW_UPDATE_METHOD_NAME = 'commitUpdate';

module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const collection = j(file.source);
  const printOptions =
    options.printOptions || {quote: 'single', trailingComma: true};

  // Find anything that looks like a reference to Relay.Store
  const relayStoreNodes = [
    // Verbatim Relay.Store
    j.memberExpression(j.identifier('Relay'), j.identifier('Store')),
    // Verbatim RelayStore
    j.identifier('RelayStore'),
  ];
  const variableDeclarators = collection.findVariableDeclarators();
  // FooRelay.Store where FooRelay = require('relay')
  variableDeclarators
    .filter(j.filters.VariableDeclarator.requiresModule('relay'))
    .forEach(p =>
      relayStoreNodes.push(
        j.memberExpression(p.value.id, j.identifier('Store'))
      )
    );
  // FooRelayStore where FooRelayStore = require('RelayStore')
  variableDeclarators
    .filter(j.filters.VariableDeclarator.requiresModule('RelayStore'))
    .forEach(p => relayStoreNodes.push(p.value.id));
  // BarRelayStore where BarRelayStore = Relay.Store or FooRelay.Store
  variableDeclarators
    .filter(p =>
      p.value.init && relayStoreNodes.some(storeNode =>
        j(storeNode).toSource() === j(p.value.init).toSource()
      )
    )
    .forEach(p => relayStoreNodes.push(p.value.id));

  // Replace every eligible instance of `update` with `commitUpdate`
  const didTransform = collection
    .find(j.MemberExpression)
    .filter(p => {
      const propNode = p.value.property;
      return (
        (
          (j.Identifier.check(propNode) && propNode.name === 'update') ||
          (j.Literal.check(propNode) && propNode.value === 'update')
        ) &&
        relayStoreNodes.some(storeNode => {
          const objectNode = p.value.object;
          return j(objectNode).toSource() === j(storeNode).toSource();
        })
      );
    })
    .forEach(p => {
      const propertyNode = p.value.property;
      if (j.Literal.check(propertyNode)) {
        propertyNode.value = NEW_UPDATE_METHOD_NAME;
      } else if (j.Identifier.check(propertyNode)) {
        propertyNode.name = NEW_UPDATE_METHOD_NAME;
      }
    })
    .size() > 0;

  return didTransform ? collection.toSource(printOptions) : null;
};
