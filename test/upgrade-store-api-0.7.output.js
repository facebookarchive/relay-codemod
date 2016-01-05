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
RequiredRelay.Store.commitUpdate(
  new DoSomethingMutation()
);

// RelayStore through a require
RequiredRelayStore.commitUpdate(
  new DoSomethingMutation()
);

// Relay through indirection
var StoredStore = RequiredRelay.Store;
StoredStore.commitUpdate(
  new DoSomethingMutation()
);
var VebatimStoredStore = Relay.Store;
VebatimStoredStore.commitUpdate(
  new DoSomethingMutation()
);

// RelayStore through indirection
var StoredStoreStore = RequiredRelayStore;
StoredStoreStore.commitUpdate(
  new DoSomethingMutation()
);
var VebatimStoredStoreStore = RelayStore;
VebatimStoredStoreStore.commitUpdate(
  new DoSomethingMutation()
);

// Verbatim Relay.Store
Relay.Store.commitUpdate(
  new DoSomethingMutation()
);
Relay.Store['commitUpdate'](
  new DoSomethingMutation()
);

// Verbatim RelayStore
RelayStore.commitUpdate(
  new DoSomethingMutation()
);
RelayStore['commitUpdate'](
  new DoSomethingMutation()
);

// Non-Relay things to leave alone
foo.update('foo');
Foo.Store.update('foo');
