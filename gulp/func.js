'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const func = require('./func');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');

const config = require('./const');

exports.buildScripts = buildScripts;
exports.buildStyles = buildStyles;
exports.browserSyncInit = browserSyncInit;

function buildScripts () {
	return gulp
		.src(path.join(conf.paths.src, '/app/**/*.js'))
		.pipe($.eslint())
		.pipe($.eslint.format());
}

function buildStyles () {
	const sassOptions = {
    style: 'expanded',
		indentType: 'tab',
		indentWidth: 1,
		linefeed: 'lf',
		outputStyle: 'expanded',
		omitSourceMapUrl: true
  };

	return gulp
		.src([
    	path.join(conf.paths.src, '/sass/main.scss')
  	])
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
}

function browserSyncInit (baseDir, browsy) {
	const browser = browsy === undefined ? 'default' : browsy;
	const server = {
		baseDir: baseDir,
		routes: null
	};

	browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    ghostMode: false,
		open: false
  });
}
