(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.MudHead = factory(root);
	}
}(typeof global !== 'undefined' ? global : this.window || this.global, (function (root) {
	'use strict';

	var mudhead = {};
	var setting;
	var DEFAULTS = {
		plugins: {
			body: {
				event: 'resize',
				selector: 'body, .content-wrapper .content',
				handler: _bodyResizeHandler
			},
			pushMenu: {
				event: 'click',
				selector: '[data-mud-toggle="push-menu"]',
				handler: _pushMenuHandler
			},
			metisMenu: {
				event: 'init',
				selector: '[data-mud-metis="tree"]',
				handler: _metisMenuHandler
			},
			formElem: {
				event: 'focus blur',
				selector: 'body [data-mud-input="true"]',
				handler: _materialFormElemHandler
			},
			perfectScroll: {
				event: 'init',
				selector: '[data-mud-ps="pefect-scroll"]',
				handler: _perfectSbHandler
			}
		}
	};
	
	var isSupported = function () {
		return 'querySelector' in document && 'addEventListener' in root;
	};
	var extend = function () {
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}
		return extended;
	};
	function updateWrapper(posH, negH) {
		posH = posH || $(window).height();
		negH = negH || $('.main-header').outerHeight();
		$('body .content-wrapper').css({
			minHeight: $('body').hasClass('has-fixed-top') ? posH : posH - negH
		});
	}

	function _perfectSbHandler (args) {
		if ($(args.selector).length !== 0) {
			$(args.selector).perfectScrollbar();
		}
	}

	function _materialFormElemHandler (args) {
		$(args.selector).on(args.event, function (i) {
			$(this).parents('.form-group').toggleClass('md-input-focused', 'focus' === i.type || this.value.length > 0);
		});
	}

	function _bodyResizeHandler (args) {
		var ctrl = mudhead;
		$(window, args.selector).on(args.event, function () {
			ctrl.clearsTimeout();
			var winH = $(window).height();
			var headH = $('.main-header').outerHeight() || 0;
			ctrl.timeout = setTimeout(function () {
				ctrl.clearsTimeout();
				updateWrapper(winH, headH);
			}, 5);
			return this;
		});
	}

	function _metisMenuHandler (args) {
		var defOpts = {
			triggerElement: '.treeview-link',
			parentTrigger: '.treeview',
			subMenu: '.treeview-menu'
		};
		var tree = document.querySelector(args.selector);
		if ( tree !== null ) {
			$(tree).metisMenu(defOpts);
		}
	}

	function _pushMenuHandler (args) {
		var ctrl = mudhead;
		var el = document.querySelector('body ' + args.selector);
		el.addEventListener(args.event, function (ev) {
			ev.preventDefault();
			ctrl.clearsTimeout();
			ctrl.timeout = setTimeout(function () {
				ctrl.clearsTimeout();
				var zBody = document.querySelector('body');	
				zBody.classList.toggle('side-mini');
				updateWrapper();
			}, 10);
			return this;
		}, false);
	}

	function _bindListeners () {
		for (var k in DEFAULTS.plugins) {
			DEFAULTS.plugins[k].handler.apply({}, [DEFAULTS.plugins[k]]);
		}
		if (!mudhead.active) {
			$('body .wrapper').css({
				height: 'auto',
				minHeight: '100%'
			});
			mudhead.active = true;
		}
	}

	function clearsTimeout () {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}

	function init (options) {
		if (!isSupported()) return;
		setting = extend({}, options || {});
		_bindListeners(setting);
	}

	mudhead.init = init;
	mudhead.clearsTimeout = clearsTimeout;
	mudhead.timeout = null;
	mudhead.active = false;

	if (document.readyState !== 'loading') mudhead.init();
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', mudhead.init);
	else document.attachEvent('onreadystatechange', function(){
		if (document.readyState=='complete') mudhead.init;
	});

	return mudhead;
})));