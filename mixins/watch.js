'use strict';

const watch = require('gulp-watch');
const globResolve = require(__dirname + '/../utils/glob_resolve.js');

function getCallback(gulp, tasks) {
  tasks = tasks || [];

  if (!(tasks instanceof Array)) {
    tasks = [tasks];
  }

  return function() {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      gulp.start(task);
    }
  };
}

module.exports = function(gulp) {
  
  gulp.watch = function() {
    let args = Array.prototype.slice.call(arguments, 0);

    if (args.length < 2) {
      args.push(null);
    }

    if (args.length < 3) {
      args.splice(1, 0, null);
    }

    let glob = args[0];
    let opts = args[1];
    let cb = args[2];

    if (typeof(cb) !== 'function') {
      cb = getCallback(gulp, cb);
    }

    glob = globResolve(gulp.config.src, glob);
    watch(glob, opts, cb);
  };
};