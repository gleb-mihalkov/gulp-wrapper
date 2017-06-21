'use strict';

function invokeTask(taskFn, name, deps, fn) {
  let args = [task, fn];

  if (deps) {
    args.splice(1, 0, deps);
  }

  return taskFn.apply(gulp, args);
}

module.exports = function(gulp) {
  let taskFn = gulp.task;

  return function() {
    let args = Array.prototype.slice.call(arguments, 0);
    let argsCount = args.length;

    if (argsCount < 2) {
      args.push(null);
    }

    if (argsCount < 3) {
      args.splice(1, 0, null);
    }

    let task = args[0];
    let deps = args[1];
    let fn = args[2];

    let units = task.split(':');
    
    if (units.length === 0) {
      return invokeTask(taskFn, task, deps, fn);
    }
  };
};