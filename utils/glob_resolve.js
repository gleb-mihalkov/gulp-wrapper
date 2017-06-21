'use strict';

const Path = require('path');
const cwd = process.cwd();

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

    let path = Path.resolve(base, item);

    if (path.indexOf(cwd)) {
      path = '.' + path.substr(cwd.length);
    }
    
    let prefix = isIgnore ? '!' : '';
    path = prefix + path;

    list.push(path);
  }

  return list;
};