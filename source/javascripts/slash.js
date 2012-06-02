(function($){
	// Open external links in new window
	var externalLinks = function(){
		var host = location.host;

		$('body').on('click', 'a', function(e){
			var href = this.href,
				link = href.replace(/https?:\/\/([^\/]+)(.*)/, '$1');

			if (link != host){
				window.open(href);
				e.preventDefault();
			}
		});
	};


	/* navigation.js */
	var appends = '<option>Menu</option>';

	$('.menu .main > li').each(function(){
		var link = $(this).children('a');
		appends += '<option value="'+link.attr('href')+'">'+link.html()+'</option>';
		$(this).find('li').each(function(){
			var link = $(this).children('a');
			appends += '<option value="'+link.attr('href')+'">- '+link.html()+'</option>';
		});
	});

	$('nav.menu').append('<select>'+appends+'</select>').on('change', 'select', function(){
		location.href = $(this).val();
	});

	/* caption.js */
	$('.entry').each(function(i){
		var _i = i;
		$(this).find('img').each(function(){
			var alt = $(this).attr('alt');

			if (alt == '' || typeof alt == 'undefined'){
				$(this).wrap('<a href="'+$(this).attr('src')+'" class="fancybox" rel="gallery'+_i+'" />');
			} else {
				$(this).after('<span class="caption">'+alt+'</span>').wrap('<a href="'+$(this).attr('src')+'" class="fancybox" title="'+alt+'" rel="gallery'+_i+'" />');
			}
		});
	});
	$('.fancybox').fancybox();
	externalLinks(); // Delete or comment this line to disable opening external links in new window
})(jQuery);