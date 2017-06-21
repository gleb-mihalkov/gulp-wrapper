'use strict';

const notifyMessage = 'Gulp error. See a terminal log.';

const PrettyError = require('pretty-error');
const Notify = require('gulp-notify');

let renderer = null;
let notifier = null;

module.exports = function(cb) {
  if (renderer == null) {
    notifier = Notify.onError(notifyMessage);
    renderer = new PrettyError();
    renderer.skipNodeFiles();
  }

  return function(error) {
    let message = renderer.render(error);
    notifier(error);
    console.log(message);
    cb && cb();
  };
};