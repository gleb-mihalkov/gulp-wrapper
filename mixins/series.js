'use strict';

const sequence = require('gulp-sequence');

module.exports = function(gulp) {
	gulp.series = sequence;
};