'use strict';

const globResolve = require(__dirname + '/../utils/glob_resolve.js');
const clean = require('gulp-clean');

module.exports = function(gulp) {

	gulp.clean = function(glob) {
		let files = globResolve(gulp.config.dst, glob);
		
		return gulp._srcFn(files, { read: false })
			.pipe(clean());
	};
};