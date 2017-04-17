## relay-codemod [![Build Status](https://travis-ci.org/relayjs/relay-codemod.svg)](https://travis-ci.org/relayjs/relay-codemod)

This repository contains a collection of codemod scripts based for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help update Relay
APIs.

### Setup & run

  * `npm install -g jscodeshift`
  * `git clone https://github.com/relayjs/relay-codemod.git` or download a zip
    file from `https://github.com/relayjs/relay-codemod/archive/master.zip`
  * `jscodeshift -t <codemod-script> <file>`
  * Use the `-d` option for a dry-run and use `-p` to print the output for
    comparison

### Included scripts

#### upgrade-store-api-0.8

```
jscodeshift -t relay-codemod/transforms/upgrade-store-api-0.8.js <file>
```

Updates method calls on `Relay.Store` that were removed in Relay 0.8.0:

* `Relay.Store.update` => `Relay.Store.commitUpdate`

#### upgrade-requires-1.0

```
jscodeshift -t relay-codemod/transforms/upgrade-requires-1.0.js <file>
```

Replaces requires to /classic for upgrading to 1.0.0:

* `require('react-relay')` => `require('react-relay/classic')`
* `from 'react-relay'` => `from 'react-relay/classic'`

#### migrate-to-modern-1.0

```
jscodeshift -t relay-codemod/transforms/migrate-to-modern-1.0.js <file>
```

Attempts (in a crude way) to migrate classic APIs to modern ones.

Caveats for initial version:
* Only translates fragment containers
* Only works if react-relay is imported/requried as "Relay"
* Assumes object spread operator is ok to use

### Recast options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through the `printOptions` command line argument

 * `jscodeshift -t transform.js <file> --printOptions='{"quote":"double"}'`
