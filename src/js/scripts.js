var slanted_lines = [];

$(document).ready(function() {
	// Loads the lazy script
    $(".lazy").lazyload();

    window_init();

	// Scroll document to position
	$('.arrow-down').on('click', function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: $('.navbar').offset().top
		}, 'slow', 'swing');
	});

	$('.parallax').each(function(){
		if(isNaN(parseInt($(this).css('top')))) {
			$(this).css('top', 0);
		}
		$(this).data('topOffset', $(this).css('top'));
	});

	$('.navbar-toggle').on("click", function() {
		$('.menu-overlay').fadeToggle();
		$('body').animate({
			scrollTop: $('.navbar').offset().top
		}, 'slow', 'swing', function(){
			$('.navbar, .blank-section').toggleClass('clicked');
		});
	});

});

$(window).resize(function() {
	window_init();
});

function window_init() {
	// Set the fullscreen element to have the same height as the window when the window is resized
	$(".fullscreen").css("min-height", $(window).height());
	$(".blank-section").css("min-height", $(window).height() - $('.navbar').height());
}

// Initialize a function that makes an element parallax
// Takes the jquery element, a starting position, and a speed as arguments
function parallax($elem, dir, speed) {

	var direction = dir === 'down' ? 1 : -1;
	var topOffset = parseInt($elem.data('topOffset'));

	if($elem.offset().top < $(window).scrollTop() + $(window).height() ) {

		// Find how far the user has scrolled
		var scrolled = $(window).scrollTop() + $(window).height() - $elem.offset().top;

		// Change the top of the element based on window scroll and speed
		$elem.css('top', direction * scrolled * speed + topOffset + 'px');
	}
}

$(window).scroll(function() {
	// Set each diagonal line to parallax
	//parallax($('.slanted-line-1'), 64, 0.1);

	parallax($('.tiles-section__slanted-line-1'), 'down', 0.4);

	parallax($('.new-development-section__slanted-line-1'), 'down', 0.4);
	parallax($('.new-development-section__slanted-line-2'), 'down', 0.4);
	
	parallax($('.social-media-section__slanted-line-1'), 'down', 0.4);
	parallax($('.social-media-section__slanted-line-2'), 'down', 0.2);

	parallax($('.newsletter-section__slanted-line-1'), 'down', 0.2);
	parallax($('.newsletter-section__slanted-line-2'), 'up', 0.2);
	parallax($('.newsletter-section__slanted-line-3'), 'up', 0.3);
	parallax($('.newsletter-section__slanted-line-4'), 'down', 0.4);

	


	if($(window).scrollTop() > $('#section-1').height() + $('.navbar').height()) {
		$('.navbar').addClass('topfix');
	}
	else{
		$('.navbar').removeClass('topfix');
	}
});

