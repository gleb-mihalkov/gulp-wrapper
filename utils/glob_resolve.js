'use strict';

const Path = require('path');

function resolve(base, path) {
  path = Path.resolve(base, path);
  let cwd = process.cwd();

  return path.indexOf(cwd) === 0
    ? '.' + path.substr(cwd.length)
    : path;
}

module.exports = function(base, glob) {
  if (glob == null) return base;

  if (typeof(glob) == 'string') {
    glob = [glob];
  }

  let list = [];

  for (let i = 0; i < glob.length; i++) {
    let item = glob[i];

    let isIgnore = item[0] == '!';
    
    if (isIgnore) {
      item = item.substr(1);
    }
    
    let prefix = isIgnore ? '!' : '';
    let value = prefix + resolve(base, item);

    list.push(value);
  }

  return list;
};