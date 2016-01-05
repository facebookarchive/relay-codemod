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

### Recast options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through the `printOptions` command line argument

 * `jscodeshift -t transform.js <file> --printOptions='{"quote":"double"}'`
