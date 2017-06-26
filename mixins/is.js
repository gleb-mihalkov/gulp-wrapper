'use strict';

const gulpif = require('gulp-if');

module.exports = function(gulp) {
  gulp.is = gulpif;
};