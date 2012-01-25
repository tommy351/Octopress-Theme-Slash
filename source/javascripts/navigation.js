(function($){
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
})(jQuery);