'use strict';

const func = require('./func');
const browserSync = require('browser-sync');

exports.dependencies = ['styles'];

exports.task = function () {
	return func
		.buildStyles()
		.pipe(browserSync.stream());
};
