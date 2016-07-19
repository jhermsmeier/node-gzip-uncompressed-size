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

const fs = require('fs');
const async = require('async');
const bufferpack = require('bufferpack');
const ISIZE_LENGTH = 4;

exports.fromFile = (file, callback) => {
  const isizeBuffer = new Buffer(ISIZE_LENGTH);

  async.waterfall([
    (callback) => {
      async.parallel({
        fileDescriptor: (callback) => {
          return fs.open(file, 'r', callback);
        },
        stats: (callback) => {
          return fs.stat(file, callback);
        }
      }, callback);
    },

    (results, callback) => {
      return fs.read(
        results.fileDescriptor,
        isizeBuffer,
        0,
        ISIZE_LENGTH,
        results.stats.size - ISIZE_LENGTH,

        (error) => {
          return callback(error, results.fileDescriptor);
        }
      );
    },

    fs.close,

    (callback) => {
      return callback(null, bufferpack.unpack('<I', isizeBuffer, 0)[0]);
    }

  ], callback);
};
