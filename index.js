'use strict'

const gulp = require('gulp');
const configMixin = require('./mixins/config.js');
const taskMixin = require('./mixins/task.js');
const watchMixin = require('./mixins/watch.js');
const srcMixin = require('./mixins/src.js');
const dstMixin = require('./mixins/dst.js');
const utilMixin = require('./mixins/util.js');
const isMixin = require('./mixins/is.js');
const debugMixin = require('./mixins/debug.js');
const ignoreMixin = require('./mixins/ignore.js');
const addMixin = require('./mixins/add.js');

module.exports = function() {
	configMixin(gulp);
	taskMixin(gulp);
  watchMixin(gulp);
  srcMixin(gulp);
  dstMixin(gulp);
  utilMixin(gulp);
  isMixin(gulp);
  ignoreMixin(gulp);
  debugMixin(gulp);
  addMixin(gulp);

	return gulp;
}();