'use strict';

const globResolve = require(__dirname + '/utils/glob_resolve.js');
const add = require('gulp-add-src');

function getWrapper(gulp, fn) {

  return function(glob) {
    glob = globResolve(gulp.config.src, glob);
    return fn.call(add, glob);
  };
}

module.exports = function(gulp) {
  gulp.prepend = getWrapper(gulp, add.prepend);
  gulp.add = getWrapper(gulp, add.append);
};