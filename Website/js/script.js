$(document).ready(function(){
	// Remove scrolling when nav clic
	$("nav .no-clic a").on('click', function(event) {
		event.preventDefault();
 	});
 	// google car door click handler
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
	var hash = this.hash;
	var scrolling = (idx < 1) ? 0 : $(window).width() - $("nav").width() + $("#content"+idx).outerWidth(true) * (idx-1);
	$('html, body').animate({
		scrollLeft: scrolling
	}, 600, function(){
		window.location.hash = hash;
	});
}
// Horizontal scrolling
$(function(){
	$("body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 40);
		event.preventDefault();
	});
});
// Scrolling event
$(window).scroll(function(){
 	$("#home").css("zIndex", ($(window).scrollLeft() < $(window).width()*0.2) ? "0" : "-1");
	$("#window").attr("class", ($(window).scrollLeft() < $(window).width()) ? "window window-absolute" : "window window-fixed");
})
// Tootip and Popover activation
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
})