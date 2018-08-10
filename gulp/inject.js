'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');

exports.dependencies = ['const', 'scripts', 'styles'];

exports.task = function () {

	const injectStyles = gulp
		.src([
    path.join(conf.paths.tmp, '/serve/app/main.css')
  ], {read: false});

	const injectScripts = gulp
		.src([
    	path.join(conf.paths.src, '/js/**/*.js'),
			path.join('!' + conf.paths.src, '/js/plugin/**/*.js'),
  	])
  	.on('error', conf.errorHandler('AngularFilesort'));

	const injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

	return gulp
		.src(path.join(conf.paths.src, '/index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));

};
