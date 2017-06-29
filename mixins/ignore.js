'use strict';

const ignore = require('gulp-ignore');

/**
 * Add ignore mixin to Gulp instance.
 * @param  {Object} gulp Gulp instance.
 * @return {void}
 */
module.exports = function(gulp) {
  gulp.ignore = ignore.exclude;
};