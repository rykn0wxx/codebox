'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const browserSync = require('browser-sync');

exports.dependencies = ['inject'];

exports.task = function () {

	gulp.watch([path.join(conf.paths.src, '/*.html'), 'package.json'], ['inject-reload']);

	gulp.watch([
    path.join(conf.paths.src, '/sass/**/*.css'),
    path.join(conf.paths.src, '/sass/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

	gulp.watch(path.join(conf.paths.src, '/js/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

	gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });

	function isOnlyChange(event) {
	  return event.type === 'changed';
	}

};
