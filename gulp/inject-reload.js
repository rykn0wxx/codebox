'use strict';

const browserSync = require('browser-sync');

exports.dependencies = ['inject'];

exports.task = function () {
	browserSync.reload();
};
