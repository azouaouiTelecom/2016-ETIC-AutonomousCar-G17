var menu = false;
$(document).ready(function(){
	// Remove scrolling when nav clic
	$("nav .no-clic a").on('click', function(event) {
		event.preventDefault();
 	});
 	// Google car door click handler
 	$("#svg-ggcar-door").on('click', function() {
 		$("#home").css("zIndex", "-1");
 		scroll(1);
	});
	$("#svg-ggcar-door").on('mouseover', function() {
 		$("#svg-ggcar-door-d").attr("fill", "rgba(0,0,0,0.2)");
	});
	$("#svg-ggcar-door").on('mouseleave', function() {
 		$("#svg-ggcar-door-d").attr("fill", "rgba(255,255,255,0)");
	});
});
// Smooth scrolling
function scroll(idx){
	var scrolling = (idx < 1) ? 0 : $(window).width() + $("#content"+idx).outerWidth(true) * (idx-1);
	$('html, body').animate({
		scrollLeft: scrolling
	}, 600);
}
// Scrolling event
$(window).scroll(function(){
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