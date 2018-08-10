'use strict';

var gutil = require('gulp-util');

exports.paths = {
	src: 'src',
	tmp: '.tmp',
	dist: 'release'
};

exports.errorHandler = function (msg) {
	'use strict';
	return function (err) {
		gutil.log(gutil.colors.red('[' + msg + ']'), err.toString());
		this.emit('end');
	};
};
