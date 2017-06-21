'use strict';

const Path = require('path');
const cwd = process.cwd();

function resolve(value, def) {
  def = def || '.';
  return Path.resolve(def, value);
}

let defaults = {
  src: cwd,
  dst: cwd
};

let filters = {
  src: resolve,
  dst: resolve
};

function merge(dst, src) {
  for (let key in src) {
    if (!src.hasOwnProperty(key)) continue;

    let value = src[key];
    let filter = filters[key];

    if (filter) {
      value = filter(value, dst[key]);
    }

    dst[key] = value;
  }
}

module.exports = function(gulp) {

  gulp.config = function(options) {
    merge(gulp.config, options);
  };

  merge(gulp.config, defaults);
};