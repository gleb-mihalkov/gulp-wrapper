'use strict';

const pathResolve = require('../utils/path_resolve.js');
const concat = require('gulp-concat');
const Path = require('path');

function splitDest(gulp, dest) {
  let separator = Path.sep;
  let index = dest.lastIndexOf(separator);

  let basename = null;
  let filename = null;

  if (index < 0) {
    filename = dest;
    basename = '.';
  }
  else {
    basename = dest.substr(0, index);
    filename = dest.substr(index + 1);
  }

  let isBasename = filename && filename.indexOf('.') < 0;

  if (isBasename) {
    basename = basename + separator + filename;
    filename = '';
  }

  basename = pathResolve(gulp.config.dst, basename);
  return [basename, filename];
}

module.exports = function(gulp) {
  gulp._dstFn = gulp.dest;

  gulp.dst = function(dest) {
    dest = dest || '';
    dest = splitDest(gulp, dest);

    let basename = dest[0];
    let filename = dest[1];

    let destStream = gulp._dstFn(basename);
    let resultStream = destStream;

    if (filename) {
      let concatStream = concat(filename);
      concatStream.pipe(destStream);
      resultStream = concatStream;
    }

    return resultStream;
  };
};