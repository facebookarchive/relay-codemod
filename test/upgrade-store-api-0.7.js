/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var DoSomethingMutation = require('MyMutation');
var RequiredRelay = require('relay');
var RequiredRelayStore = require('RelayStore');
var UninitializedVariable;

// Relay through a require
RequiredRelay.Store.update(
  new DoSomethingMutation()
);

// RelayStore through a require
RequiredRelayStore.update(
  new DoSomethingMutation()
);

// Relay through indirection
var StoredStore = RequiredRelay.Store;
StoredStore.update(
  new DoSomethingMutation()
);
var VebatimStoredStore = Relay.Store;
VebatimStoredStore.update(
  new DoSomethingMutation()
);

// RelayStore through indirection
var StoredStoreStore = RequiredRelayStore;
StoredStoreStore.update(
  new DoSomethingMutation()
);
var VebatimStoredStoreStore = RelayStore;
VebatimStoredStoreStore.update(
  new DoSomethingMutation()
);

// Verbatim Relay.Store
Relay.Store.update(
  new DoSomethingMutation()
);
Relay.Store['update'](
  new DoSomethingMutation()
);

// Verbatim RelayStore
RelayStore.update(
  new DoSomethingMutation()
);
RelayStore['update'](
  new DoSomethingMutation()
);

// Non-Relay things to leave alone
foo.update('foo');
Foo.Store.update('foo');
