$(document).ready(function() {
	// Loads the lazy script
    $(".lazy").lazyload();

    // Set the fullscreen element to have the same height as the window when the window is resized
	$(".fullscreen").css("min-height", $(window).height());
	$(".blank-section").css("min-height", $(window).height() - $('.navbar').height());
});

$(window).resize(function() {
	// Set the fullscreen element to have the same height as the window when the window is resized
	$(".fullscreen").css("min-height", $(window).height());
});

// Initialize a function that makes an element parallax
// Takes the jquery element, a starting position, and a speed as arguments
function parallax($elem, start, speed) {
	// Find how far the user has scrolled
	var scrolled = $(window).scrollTop();
	// Change the top of the element based on window scroll and speed
	$elem.css('top', -( (scrolled) * speed) + start + 'px');
}

$(window).scroll(function() {
	// Set each diagonal line to parallax
	parallax($('.diagonal-shape-1'), 64, 0.1);
	parallax($('.diagonal-shape-2'), 634, 0.6);

	if($(window).scrollTop() > $('#section-1').height() - $('.navbar').height() ) {
		$('.navbar').addClass('topfix');
	}
	else{
		$('.navbar').removeClass('topfix');
	}
});

