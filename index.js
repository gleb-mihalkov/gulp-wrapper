'use strict'

const gulp = require('gulp');
const taskMixin = require('./task/task.js');

module.exports = function() {
	taskMixin(gulp);

	return gulp;
}();