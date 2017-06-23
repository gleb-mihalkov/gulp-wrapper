'use strict';

const concat = require('gulp-concat');
const Path = require('path');

function splitDest(dest) {
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

  return [basename, filename];
}

module.exports = function(gulp) {
  gulp._dstFn = gulp.dest;

  gulp.dst = function(dest) {
    dest = splitDest(dest);

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

module.exports._splitDest = splitDest;