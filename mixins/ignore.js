'use strict';

const ignore = require('gulp-ignore');

module.exports = function(gulp) {
  gulp.ignore = ignore.exclude;
};