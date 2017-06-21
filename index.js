'use strict'

const gulp = require('gulp');
const configMixin = require('./mixins/config.js');
const taskMixin = require('./mixins/task.js');
const watchMixin = require('./mixins/watch.js');

module.exports = function() {
	configMixin(gulp);
	taskMixin(gulp);

	return gulp;
}();