'use strict';
// (function(window, $) {
// 	console.log($, 'tuuoio');
	
// })(window, jQuery);

(function () {

	function _run (msg) {
		$('.input-container .md-input').on('focus blur', function (i) {
			$(this).parents('.form-group').toggleClass('md-input-focused', 'focus' === i.type || this.value.length > 0);
		});
		console.log(msg);
	}

	if (document.readyState !== 'loading') _run('readyState loading');
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', _run('domContentLoaded'));
	else document.attachEvent('onreadystatechange', function(){
		if (document.readyState=='complete') _run('stateChange complete');
	});

}).call(this);