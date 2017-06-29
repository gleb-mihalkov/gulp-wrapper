'use strict';

const Path = require('path');
const cwd = process.cwd();

/**
 * Resolve path in file system.
 * @param  {String} value Path.
 * @param  {String} def   Default path.
 * @return {String}       Absolute path.
 */
function resolve(value, def) {
  def = def || '.';
  return Path.resolve(def, value);
}

/**
 * Default configuration.
 * @type {Object}
 */
let defaults = {
  src: cwd,
  dst: cwd
};

/**
 * Filters for config's properties transformation.
 * @type {Object}
 */
let filters = {
  src: resolve,
  dst: resolve
};

/**
 * Merge objects using filters and default values.
 * @param  {Object} dst Destination object.
 * @param  {Object} src Source object.
 * @return {void}
 */
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

/**
 * Add configuration mixin to Gulp instance.
 * @param  {Object} gulp Gulp instance.
 * @return {void}
 */
module.exports = function(gulp) {

  gulp.config = function(options) {
    merge(gulp.config, options);
  };

  merge(gulp.config, defaults);
};