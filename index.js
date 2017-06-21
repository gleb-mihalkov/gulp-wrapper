'use strict'

const gulp = require('gulp');

module.exports = function() {

	let taskFn = gulp.task;

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

		console.log(args);
	};

	return gulp;
}();