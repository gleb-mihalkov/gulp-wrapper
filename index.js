'use strict'

const gulp = require('gulp');
const task = require('./task/task.js');

module.exports = function() {
	gulp.task = task(gulp);

	return gulp;
}();