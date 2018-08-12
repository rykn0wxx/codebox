'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const gutl = require('gulp-util');
const browserSync = require('browser-sync');

exports.task = function () {
	const wrd = require('npm-wiredep')();
	gutl.log(wrd);
	return gulp
		.src(wrd.js)
		.pipe(gulp.dest(path.join(conf.paths.src, '/js/plugin')));
};
