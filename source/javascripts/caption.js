(function($){
	$('.entry img').each(function(){
		var alt = $(this).attr('alt');

		if (alt != ''){
			$(this).after('<span class="caption">'+alt+'</span>');
		}
	});
})(jQuery);