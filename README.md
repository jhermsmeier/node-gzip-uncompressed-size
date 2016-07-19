gzip-uncompressed-size
======================

> Determine the estimated uncompressed size from a GZIP file (uses ISIZE)

[![npm version](https://badge.fury.io/js/gzip-uncompressed-size.svg)](http://badge.fury.io/js/gzip-uncompressed-size)
[![Build Status](https://travis-ci.org/jviotti/node-gzip-uncompressed-size.svg?branch=master)](https://travis-ci.org/jviotti/node-gzip-uncompressed-size)
[![Build status](https://ci.appveyor.com/api/projects/status/nw94a5cfh5356w79/branch/master?svg=true)](https://ci.appveyor.com/project/jviotti/node-gzip-uncompressed-size/branch/master)

This module returns the GZIP `ISIZE`, which according to the [specification],
contains the size of the original (uncompressed) input. It has been documented
that the size reported is not 100% accurate.

Install
-------

```sh
$ npm install --save gzip-uncompressed-size
```

Usage
-----

```js
const gzipUncompressedSize = require('gzip-uncompressed-size');

gzipUncompressedSize.fromFile('my/compressed/file.gz', (error, uncompressedSize) => {
  if (error) {
    throw error;
  }

  console.log(uncompressedSize);
});
```

License
-------

MIT

[specification]: https://tools.ietf.org/html/rfc1952
