var menu = false;
var state = 0; // home

// Horizontal scrolling
$(function(){
	$("body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 26);
		event.preventDefault();
	});
});

$(document).ready(function(){
	// Remove scrolling when nav clic
	$("nav .no-clic a").on('click', function(event) {
		event.preventDefault();
 	});
 	// Google car door click handler
 	$("#svg-ggcar-door").on('click', function() {
 		$("#home").css("zIndex", "-1");
 		onDoorBtn();
	});
	$("#svg-ggcar-door").on('mouseover', function() {
 		$("#svg-ggcar-door-d").attr("fill", "rgba(0,0,0,0.2)");
	});
	$("#svg-ggcar-door").on('mouseleave', function() {
 		$("#svg-ggcar-door-d").attr("fill", "rgba(255,255,255,0)");
	});
});
// Door button pressed
function onDoorBtn() {
	state = 2; // scrolling to content
	scroll(1);
}
// Smooth scrolling
function scroll(idx){
	if(idx == 0)
		state = 3; // scrolling to home
	var scrolling = (idx < 1) ? 0 : $(window).width() + $("#content"+idx).outerWidth(true) * (idx-1);
	$('html, body').animate({
		scrollLeft: scrolling
	}, 600);
}
// Scrolling event
$(window).scroll(function(){
	if($(window).scrollLeft() >= $(window).width() && state != 3)
		state = 1; // blocked
	else if($(window).scrollLeft() < $(window).width() && state == 1)
		$(window).scrollLeft($(window).width());
	else if($(window).scrollLeft() == 0)
		state = 0; // home
	if(state == 0)
		$(window).scrollLeft(0);
 	$("#home").css("zIndex", ($(window).scrollLeft() <= 0) ? "0" : "-1");
	$("#window").attr("class", ($(window).scrollLeft() < $(window).width()) ? "window window-absolute" : "window window-fixed");
	$("#window").css("backgroundPosition", "center, -"+($(window).scrollLeft()*2)+"px 0");
	if(menu && $(window).scrollLeft() < $(window).width())
		onMenu();
})
// Tootip and Popover activation
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
})
// Menu event
function onMenu() {
	//$("nav").toggle("slide", "left", difplay=300);
	if(menu)
		$("nav").slideUp(300);
	else
		$("nav").slideDown(300);
	menu = !menu;
}