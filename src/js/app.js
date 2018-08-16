// (function (root, factory) {
// 	'use strict';
// 	if (typeof define === 'function' && define.amd) {
// 		define(['exports'], function(exports) {
// 			factory((root.AdminApp = exports));
// 		});
// 	} else if (typeof exports === 'object') {
// 		factory(exports);
// 	} else {
// 		root.AdminApp = factory();
// 	}
// }(this, function () {
// 	'use strict';
// 	function adminApp (elem, options) {
// 		this.element = elem;
// 		this.options = _extend({}, options);
// 	}
// 	function _extend (obj, src) {
// 		for (var key in src) {
// 			if (src.hasOwnProperty(key)) obj[key] = src[key];
// 		}
// 		return obj;
// 	}
// 	var Layout = function layout () {};
// 	Layout.init = function () {
// 		this.timeout = null;
// 		$('body .wrapper').css({
// 			height: 'auto',
// 			minHeight: '100%'
// 		});
// 		$(window).on('resize', $.proxy(this.handleResize, this));
// 		$('body [data-toggle="push-menu"]').on('click', $.proxy(this.handlePushMenu, this));
// 	};
// 	Layout.handlePushMenu = function () {
// 		var ctrl = this;
// 		this.clearTimeout();
// 		this.timeout = setTimeout(function () {
// 			ctrl.clearTimeout();
// 			$('body').toggleClass('side-mini');
// 		}, 10);
// 	};
// 	Layout.handleResize = function () {
// 		var ctrl = this;
// 		this.clearTimeout();
// 		this.timeout = setTimeout(function () {
// 			ctrl.clearTimeout();
// 			ctrl.setElems();
// 		}, 15);
// 	};
// 	Layout.setElems = function () {
// 		var winH = $(window).height();
// 		var headerH = $('.main-header').outerHeight() || 0;
// 		$('body .content-wrapper').css({
// 			minHeight: $('body').hasClass('has-fixed-top') ? winH : winH - headerH
// 		});
// 	};
// 	Layout.clearTimeout = function () {
// 		if (this.timeout) {
// 			clearTimeout(this.timeout);
// 			this.timeout = null;
// 		}
// 	};
// 	adminApp.Layout = Layout;
// 	return adminApp;
// }));

// (function () {
// 	'use strict';
// 	function _run (msg) {
// 		console.log(msg, AdminApp);
// 		AdminApp.Layout.init();
// 		$('.input-container .md-input').on('focus blur', function (i) {
// 			$(this).parents('.form-group').toggleClass('md-input-focused', 'focus' === i.type || this.value.length > 0);
// 		});
// 		if ($('.tree').length !== 0) {
// 			$('.tree').metisMenu({
// 				triggerElement: '.treeview-link',
// 				parentTrigger: '.treeview',
// 				subMenu: '.treeview-menu'
// 			});
// 		}
// 		if ($('.main-sidebar .sidebar-wrapper').length !== 0) {
// 			$('.main-sidebar .sidebar-wrapper').perfectScrollbar();
// 		}
// 	}

// 	if (document.readyState !== 'loading') _run('readyState loading');
// 	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', _run('domContentLoaded'));
// 	else document.attachEvent('onreadystatechange', function(){
// 		if (document.readyState=='complete') _run('stateChange complete');
// 	});

// }).call(this);