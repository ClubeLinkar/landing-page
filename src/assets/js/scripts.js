
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}

jQuery(document).ready(function() {

	/*
	* Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});

	/*
	* Background slideshow
	*/
	$('.top-content').backstretch("https://static.clubelinkar.com.br/images/backgrounds/background.jpg");
	$('.testimonials-container').backstretch("/assets/images/backgrounds/1.jpg");

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(){
		$('.testimonials-container').backstretch("resize");
	});

	/*
	* Wow
	*/
	new WOW().init();

});
