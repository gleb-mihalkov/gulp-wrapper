'use strict'

const gulp = require('gulp');
const configMixin = require('./config.js');
const taskMixin = require('./task.js');
const watchMixin = require('./watch.js');

module.exports = function() {
	configMixin(gulp);
	taskMixin(gulp);

	return gulp;
}();