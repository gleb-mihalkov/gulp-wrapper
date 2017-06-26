'use strict';

const GulpUtil = require('gulp-util');
const Util = require('util');

module.exports = function(gulp) {
  Util._extend(gulp, GulpUtil);
};