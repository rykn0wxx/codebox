'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const fs = require('fs');

fs
	.readdirSync('./gulp')
	.filter(function (filename) {
		return filename.match(/\.js$/i);
	})
	.map(function (filename) {
		return {
			name: filename.substr(0, filename.length - 3),
			contents: require('./gulp/' + filename)
		};
	})
	.forEach(function (file) {
		gulp.task(file.name, file.contents.dependencies, file.contents.task);
	});

gulp.task('default', function () {
	gutil.log(gutil.colors.red('Codebox is live'));
});
