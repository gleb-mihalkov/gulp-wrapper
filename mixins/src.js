'use strict';

const errorHandler = require(__dirname + '/utils/error_handler.js');
const globResolve = require(__dirname + '/utils/glob_resolve.js');
const Util = require('util');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

let nativeHandler = errorHandler();

module.exports = function(gulp) {
  gulp._srcFn = gulp.src;

  gulp.src = function(src, opts) {
    src = globResolve(gulp.config.src, src);

    opts = opts || {};
    opts = Util._extend({}, opts);

    let result = gulp._srcFn(src, opts)

    if (opts.errorHandler !== false) {
      let handler = opts.errorHandler ? opts.errorHandler : nativeHandler;
      let handlerOpts = {errorHandler: handler};
      result = result.pipe(plumber(handlerOpts));
    }

    if (opts.changed) {
      let destPath = opts.changed === true ? gulp.config.dst : opts.changed;
      result = result.pipe(changed(destPath));
    }

    return result;
  };
};