(function($){
	var host = location.host;

	$('a').on('click', function(e){
		var href = $(this).attr('href'),
			link = href.replace(/(https?:\/\/)(.*)\/(.*)/, '$2');

		if (href.match('https?') && link != host){
			window.open(href);
			e.preventDefault();
		}
	});
})(jQuery);