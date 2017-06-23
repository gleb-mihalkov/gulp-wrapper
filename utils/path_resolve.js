'use strict';

const Path = require('path');
const cwd = process.cwd();

module.exports = function() {
  let args = Array.prototype.slice.call(arguments, 0);

  if (args.length === 0) {
    args.push('.');
  }

  if (args.length < 2) {
    args.splice(0, 0, '.');
  }

  let base = args[0];
  let path = args[1];

  let result = Path.resolve(base, path);

  if (result.indexOf(cwd) === 0) {
    result = '.' + result.substr(cwd.length);
  }

  return result;
};