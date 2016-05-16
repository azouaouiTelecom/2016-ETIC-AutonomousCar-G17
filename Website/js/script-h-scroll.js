// Horizontal scrolling
$(function(){
	$("body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 40);
		event.preventDefault();
	});
});