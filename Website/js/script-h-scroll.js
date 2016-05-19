// Horizontal scrolling
$(function(){
	$("body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 20);
		event.preventDefault();
	});
});