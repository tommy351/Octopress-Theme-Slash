(function($){
	var banner = $('#banner');
	banner.children('.error').hide();

	var loaded = function(length){
		var images = banner.find('img'),
			dots = banner.children('.dots'),
			width = banner.children('.image').width(),
			fragment = document.createDocumentFragment(),
			count = 0,
			trigger = false,
			timer;
		
		images.each(function(i){
			$(this).css('left', width*i);

			var item = document.createElement('li');
			$(item).click(function(){
				shift(i);
			});
			if (i == 0) $(item).addClass('current');
			fragment.appendChild(item);
		});

		dots.append(fragment);

		var shift = function(i){
			if (trigger == false){
				var gap = width * (i - count);
				trigger = true;

				banner.find('.wrap').animate({left: '-='+gap}, 1000, 'easeOutQuart', function(){
					dots.children('li').eq(count).removeClass('current');
					dots.children('li').eq(i).addClass('current');
					banner.children('')
					count = i;
					main();
					trigger = false;
				});
			} else {
				return false;
			}
		};

		var prev = function(){
			para = count == 0 ? length - 1 : count - 1;
			shift(para);
		};

		var next = function(){
			shift((count+1)%length);
		};

		var main = function(){
			clearTimeout(timer);
			timer = setTimeout(next, 10000);
		};

		banner.on({
			'mouseenter': function(){
				clearTimeout(timer);
			},
			'mouseleave': function(){
				main();
			}
		}).on('click', '.prev', prev).on('click', '.next', next);

		main();
	};

	var random = function(){
		return (Math.round(Math.random())-0.5);
	};

	$.ajax({
		url: 'https://picasaweb.google.com/data/feed/api/user/105931860008509594725/albumid/5663590803175839297?alt=json&callback=?',
		dataType: 'json',
		type: 'GET',
		success: function(json){
			var fragment = document.createDocumentFragment(),
				arr = [];

			$(json.feed.entry).each(function(i, data){
				var link = data.media$group.media$thumbnail[0].url.replace(/\/\w\d+(-\w\d*)*\/([^\/]+)$/, '/s0/$2');
				arr.push(link);
			});

			arr.sort(random);
			var length = arr.length;

			for (var i=0; i<length; i++){
				var item = document.createElement('img');
				item.src = arr[i];
				fragment.appendChild(item);
			}

			banner.find('.wrap').append(fragment).children('img').eq(0).load(function(){
				banner.children('.loading').fadeOut(500);
				loaded(length);
			});
		}
	});
})(jQuery);