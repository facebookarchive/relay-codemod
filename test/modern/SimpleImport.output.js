/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import Child from './child';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

class TestComponent extends React.Component {
  render() {
    return (
      <span>
        <Child data={this.props.foo} />
      </span>
    );
  }
}

export default createFragmentContainer(TestComponent, {
  foo: graphql`
    fragment SimpleImport_foo on Foo {
      ...Child_foo,
      bar,
      baz
    }
  `,
});
