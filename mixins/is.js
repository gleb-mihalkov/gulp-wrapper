'use strict';

const gulpif = require('gulp-if');

/**
 * Add conditional mixin to Gulp instance.
 * @param  {Object} gulp Gulp instance.
 * @return {void}
 */
module.exports = function(gulp) {
  gulp.is = gulpif;
};