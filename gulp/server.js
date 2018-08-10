'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const func = require('./func');
const browserSync = require('browser-sync');

exports.dependencies = ['watch'];

exports.task = function () {
	func.browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
};
