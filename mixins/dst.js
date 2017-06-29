'use strict';

const pathResolve = require(__dirname + '/../utils/path_resolve.js');
const concat = require('gulp-concat');
const Path = require('path');

/**
 * Split destination path to basename and filename.
 * @param  {Object} gulp Gulp instance.
 * @param  {String} dest Destination path.
 * @return {Array}       Array like [basename, filename].
 */
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

/**
 * Add mixin to Gulp instance.
 * @param  {Object} gulp Gulp instance.
 * @return {void}
 */
module.exports = function(gulp) {
  gulp._dstFn = gulp.dest;

  gulp.dst = function(dest, options) {
    options = options || {};
    dest = dest || '';

    dest = splitDest(gulp, dest);

    let basename = dest[0];
    let filename = dest[1];

    let destStream = gulp._dstFn(basename, options);
    let resultStream = destStream;

    if (filename) {
      let concatStream = concat(filename);
      concatStream.pipe(destStream);
      resultStream = concatStream;
    }

    return resultStream;
  };
};