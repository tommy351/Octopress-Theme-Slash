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

	// Append menu for mobile device
	var navigationMenu = function(){
		var appends = '<option>Menu</option>';

		var search = function(obj, level){
			var children = obj.children(),
				link = children.eq(0),
				_level = level + 1;

			appends += '<option value="'+link.attr('href')+'">';

			if (level > 0) appends += '|';

			for (var i=0; i<level; i++){
				appends += '—';
			}

			appends += link.text()+'</option>';

			if (children.length > 1){
				children.eq(1).children('li').each(function(){
					search($(this), _level);
				});
			}
		};

		$('#header .menu .main').children('li').each(function(){
			search($(this), 0);
		});

		$('#header .menu').append('<select>'+appends+'</select>').on('change', 'select', function(){
			location.href = $(this).val();
		});
	};

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