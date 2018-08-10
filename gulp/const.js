'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const browserSync = require('browser-sync');

exports.task = function () {
	const wrd = require('npm-wiredep')();
	return gulp
		.src(wrd.js)
		.pipe(gulp.dest(path.join(conf.paths.src, '/js/plugin')));
};
