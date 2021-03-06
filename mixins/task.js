'use strict';

/**
 * Create node for task tree.
 * @param  {String}   name Short name of task (without path).
 * @param  {Array}    deps Dependencies of this task.
 * @param  {Function} fn   Task's callback.
 * @return {Object}        Node of the task tree.
 */
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

/**
 * Find the parent node in the task tree for injection of new node.
 * @param  {Object} node Root node of tree.
 * @param  {Object} task New node.
 * @return {Object}      Parent node.
 */
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

/**
 * Push the new node in task tree.
 * @param  {Object} gulp Instance of Gulp.
 * @param  {Object} node New task node.
 * @return {void}
 */
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

/**
 * Register all tasks from tree in instance of Gulp.
 * @param  {Object} gulp Gulp instance.
 * @param  {Object} node Current node for recursive traversing.
 * @return {void}
 */
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
    childs = childs.concat(node.deps);
  }

  if (node.full === '_root') return;

  let task = node.full;
  let deps = childs;
  let fn = node.fn;

  gulp._taskFn(task, deps, fn);
}

/**
 * Add new methods into gulp instance.
 * @param  {Object} gulp Instance of Gulp.
 * @return {void}
 */
module.exports = function(gulp) {

  gulp._taskTree = create('_root');
  gulp._taskFn = gulp.task;

  gulp.task = function() {
    let args = Array.prototype.slice.call(arguments, 0);

    if (args.length < 2) {
      args.push(null);
    }

    if (args.length < 3) {
      if (typeof(args[1]) === 'function') {
        args.splice(1, 0, null);
      }
      else {
        args.push(null);
      }
    }

    let task = args[0];
    let deps = args[1];
    let fn = args[2];

    let node = create(task, deps, fn);
    push(gulp, node);
  };

  gulp.init = function() {
    register(gulp);

    let defs = Array.prototype.slice.call(arguments, 0);
    let tail = defs[defs.length - 1];
    let fn = null;

    if (tail && typeof(tail) === 'function') {
      fn = defs.pop();
    }

    gulp._taskFn('default', defs, fn);
  };
};