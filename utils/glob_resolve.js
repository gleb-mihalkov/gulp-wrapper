'use strict';

const pathResolve = require('./path_resolve.js');

module.exports = function() {
  let args = Array.prototype.slice.call(arguments, 0);

  if (args.length < 2) {
    args.splice(0, 0, cwd);
  }

  let base = args[0];
  let glob = args[1];

  if (typeof(glob) === 'string') {
    glob = [glob];
  }

  let list = [];

  for (let i = 0; i < glob.length; i++) {
    let item = glob[i];

    let isIgnore = item[0] == '!';
    
    if (isIgnore) {
      item = item.substr(1);
    }

    let path = pathResolve(base, item);
    
    let prefix = isIgnore ? '!' : '';
    path = prefix + path;

    list.push(path);
  }

  return list;
};