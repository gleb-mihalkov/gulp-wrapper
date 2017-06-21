'use strict';

const errorHandler = require('../units/error_handler.js');
const globResolve = require('../utils/glob_resolve.js');
const plumber = require('gulp-plumber');

let handler = errorHandler();

module.exports = function(gulp) {
  gulp._srcFn = gulp.src;

  gulp.src = function(src, opts) {
    src = globResolve(gulp.config.src, src);
    opts = opts || {};

    return gulp._srcFn(src, opts)
      .pipe(plumber({
        errorHandler: handler
      }));
  };
};