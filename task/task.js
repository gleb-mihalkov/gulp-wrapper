'use strict';

function create(name, deps, fn) {
  let path, full;

  if (typeof(name) === 'string') {
    path = name.split(':');
    full = name;
  }
  else {
    path = name;
    full = path.join(':');
  }

  name = path[path.length - 1];

  return {
    path: path,
    full: full,
    name: name,
    deps: deps,
    fn: fn,
    childs: {},
  };
}

function findParent(node, task) {
  for (let i = 0; i < task.path.length - 1; i++) {
    let name = task.path[i];
    let next = node.childs[name];

    if (next == null) {
      let slice = task.path.slice(0, i + 1);
      next = create(slice);
      node.childs[name] = next;
    }

    node = next;
  }

  return node;
}

function push(gulp, node) {
  let parent = findParent(gulp._taskTree, node);
  let old = parent.childs[node.name];

  if (old == null) {
    parent.childs[node.name] = node;
    return;
  }

  old.deps = node.deps;
  old.fn = node.fn;
}

function pushDefault(gulp, name) {
  let node = create('default:' + name);
  push(gulp, node);
}

function register(gulp, node) {
  if (node == null) {
    node = gulp._taskTree;
  }

  let childs = [];

  for (let name in node.childs) {
    if (!node.childs.hasOwnProperty(name)) continue;
    
    let child = node.childs[name];
    register(gulp, child);

    childs.push(child.full);
  }

  if (node.deps) {
    for (let i = 0; i < node.deps.length; i++) {
      let dep = node.deps[i];
      if (childs.indexOf(dep) < 0) childs.push(dep);
    }
  }

  if (node.full === '_root') return;

  let task = node.full;
  let deps = childs;
  let fn = node.fn;

  gulp._taskFn(task, deps, fn);
}

module.exports = function(gulp) {

  gulp._taskTree = create('_root');
  gulp._taskFn = gulp.task;

  gulp.task = function() {
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

    let node = create(args[0], args[1], args[2]);
    push(gulp, node);
  };

  gulp.init = function() {
    register(gulp);

    let defs = Array.prototype.slice.call(arguments, 0);
    gulp._taskFn('default', defs);
  };
};