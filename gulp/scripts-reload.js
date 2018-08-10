'use strict';

const func = require('./func');
const browserSync = require('browser-sync');

exports.task = function () {
	const bldJs = func.buildScripts();
	browserSync.reload();
	return bldJs;
};
