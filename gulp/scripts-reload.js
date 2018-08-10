'use strict';

const func = require('./func');
const browserSync = require('browser-sync');

exports.task = function () {
	return func.buildScripts()
		.pipe(browserSync.stream());
};
