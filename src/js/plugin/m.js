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
				selector: 'body .nav-toggler[data-mud-toggle="push-menu"], body .sidebar-toggler[data-mud-toggle="push-menu"]',
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
			},
			boxWidget: {
				selector: '[data-widget="collapse"]',
				event: 'click',
				handler: _boxWidgerHandler
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
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('box.widget');
      if (!data) {
        var options = $.extend({}, {
					collapseIcon: 'indeterminate_check_box',
					expandIcon: 'add_box',
					collapseTrigger: '[data-widget="collapse"]'
				}, $this.data(), typeof option == 'object' && option);
        $this.data('box.widget', (data = new BoxWidget($this, options)));
      }
      if (typeof option == 'string') {
        if (typeof data[option] == 'undefined') {
          throw new Error('No method named ' + option);
        }
        data[option]();
      }
    });
  }

	var BoxWidget = function (element, options) {
		this.element = element;
		this.options = options;
		if (!this.options.parentElem) this.options.parentElem = this.element.closest('.box');
		this._initBox();
	};
	BoxWidget.prototype._initBox = function () {
		var o = this;
		o.options.parentElem.on('click', o.options.collapseTrigger, function (event) {
			if (event) event.preventDefault();
			o.toggle($(this));
			$(this).blur();
			return false;
		});
	};

	BoxWidget.prototype.toggle = function () {
		var o = this;
		var isOpen = !$(o.options.parentElem).is('.collapsed-box');
		if (isOpen) {
			o.collapse();
		} else {
			o.expand();
		}
	};

	BoxWidget.prototype.collapse = function () {
		var o = this;
		o.options.parentElem.children('.box-body, .box-footer')
			.slideUp(500, function () {
				var elIcon = o.element.find('i');
				elIcon.html(o.options.expandIcon);
				o.options.parentElem.addClass('collapsed-box');
			}.bind(this));
	};

	BoxWidget.prototype.expand = function () {
		var o = this;
		o.options.parentElem.children('.box-body, .box-footer')
		.slideDown(500, function () {
			var elIcon = o.element.find('i');
			elIcon.html(o.options.collapseIcon);
			o.options.parentElem.removeClass('collapsed-box');
		}.bind(this));
	};

	function _boxWidgerHandler (args) {
		$(args.selector).each(function () {
			Plugin.call($(this), {
				parentElem: $(this).closest('.box')
			});
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
		$(args.selector).on(args.event, function (ev) {
			var el = $(ev.currentTarget);
			ev.preventDefault();
			ctrl.clearsTimeout();
			ctrl.timeout = setTimeout(function () {
				ctrl.clearsTimeout();
				var zBody = document.querySelector('body');
				if (el.hasClass('nav-toggler')) {
					zBody.classList.toggle('show-sidebar');
				} else if (el.hasClass('sidebar-toggler')) {
					zBody.classList.toggle('mini-sidebar');
				}
				updateWrapper();
			}, 10);
			return this;
		});
	}

	function _bindListeners () {
		if (!mudhead.is_test) {

			for (var k in DEFAULTS.plugins) {
				DEFAULTS.plugins[k].handler.apply({}, [DEFAULTS.plugins[k]]);
			}
			if (mudhead.active) {
				$('body .wrapper').css({
					height: 'auto',
					minHeight: '100%'
				});
				mudhead.active = true;
			}

		} else {
			$('[data-mud-metis="tree"]').metisMenu();
			document.addEventListener('click', function (event) {
				if ( event.target.href === '#' ) event.preventDefault();
			}, false);
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
	mudhead.is_test = false;

	if (document.readyState !== 'loading') mudhead.init();
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', mudhead.init);
	else document.attachEvent('onreadystatechange', function(){
		if (document.readyState=='complete') mudhead.init;
	});

	return mudhead;
})));