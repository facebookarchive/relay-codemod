/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

describe('Migrate from classic to compat APIs for v1.0.0', () => {
  it('transforms correctly', () => {
    test('migrate-to-modern-1.0', 'modern/SimpleRequire');
    test('migrate-to-modern-1.0', 'modern/SimpleImport');
  });
});
