/*
 * The MIT License
 *
 * Copyright (c) 2016 Juan Cruz Viotti. https://github.com/jviotti
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

const async = require('async');
const fs = require('fs');
const path = require('path');
const gzipUncompressedSize = require('../index');

const files = fs.readdirSync(path.join(__dirname, 'files'));

async.eachSeries(files, (file, callback) => {
  console.log(`Testing: ${file}`);

  const expectedSize = parseInt(path.basename(file, path.extname(file)), 10);
  const filePath = path.join(__dirname, 'files', file);

  gzipUncompressedSize.fromFile(filePath, (error, uncompressedSize) => {
    if (error) {
      return callback(error);
    }

    if (expectedSize === uncompressedSize) {
      console.log('Pass');
      return callback(null);
    }

    console.error(`Expected uncompressed size: ${expectedSize}`);
    console.error(`Reported uncompressed size: ${uncompressedSize}`);
    return callback(new Error('Fail'));
  });
}, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Success');
});