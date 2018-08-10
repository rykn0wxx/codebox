'use strict';

const path = require('path');
// const gulp = require('gulp');
const conf = require('./conf');
const $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'del']
});

exports.task = function () {
	return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
};
