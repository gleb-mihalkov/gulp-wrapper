'use strict';

const debug = require('gulp-debug');

/**
 * Add debuggin mixin to Gulp instance.
 * @param  {Object} gulp Gulp instance.
 * @return {void}
 */
module.exports = function(gulp) {
  gulp.debug = debug;
};