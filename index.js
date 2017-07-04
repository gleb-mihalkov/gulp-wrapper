'use strict'

const gulp = require('gulp');
const configMixin = require(__dirname + '/mixins/config.js');
const taskMixin = require(__dirname + '/mixins/task.js');
const watchMixin = require(__dirname + '/mixins/watch.js');
const srcMixin = require(__dirname + '/mixins/src.js');
const dstMixin = require(__dirname + '/mixins/dst.js');
const utilMixin = require(__dirname + '/mixins/util.js');
const isMixin = require(__dirname + '/mixins/is.js');
const debugMixin = require(__dirname + '/mixins/debug.js');
const ignoreMixin = require(__dirname + '/mixins/ignore.js');
const addMixin = require(__dirname + '/mixins/add.js');
const cleanMixin = require(__dirname + '/mixins/clean.js');
const seriesMixin = require(__dirname + '/mixins/series.js');

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
  cleanMixin(gulp);
  seriesMixin(gulp);

	return gulp;
}();