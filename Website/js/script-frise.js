var w = 12;
var h = 3;
var timeSH = 400;
var iMin = 1;
var idx = 1;
var blockW = $(window).height() * 0.33;
var contentVisible = false;

$(document).ready(function(){
	idx = Math.floor($(window).width() / blockW) - 1;
	iMin = idx + 1;
	for(var i = 1; i <= w; i++) {
		for(var j = 1; j <= h; j++) {
			if($('#block' + i + j).length == 1) {
				if(i <= idx)
					show(i, j, 0);
				else
					hide(i, j, 0);
				$("#block" + i + j).click(function() {
					onBlock(i, j);
				});
			}
		}
	}
	$('.block').each(function() {$( this ).css('visibility', 'visible');});
	$(".blockNull").click(function() {
		onNull();
	});
});

function hide(i, j, time) {
	$('#block'+i+j).animate({
		backgroundSize: '10%'
	}, time);
	$('#block'+i+j).find('.block').slideUp(time*2/3);
}
function show(i, j, time) {
	$('#block'+i+j).animate({
		backgroundSize: '100%'
	}, time);
	$('#block'+i+j).find('.block').slideDown(time);
}

// Scrolling event
$(window).scroll(function(){
	if($(window).scrollLeft() + $(window).width() - blockW * (idx+2) > 0) {
		idx++;
		for(var j = 1; j <= h; j++) {
			if($('#block' + idx + j).length == 1)
				show(idx, j, timeSH);
			if($('#block' + (idx - iMin - 1) + '' + j).length == 1)
				hide(idx - iMin - 1, j, 0);
		}
	}
	if($(window).scrollLeft() + $(window).width() - blockW * (idx) < 0) {
		idx--;
		for(var j = 1; j <= h; j++) {
			if($('#block' + (idx + 1) + '' + j).length == 1)
				hide(idx + 1, j, 0);
			if($('#block' + (idx - iMin) + '' + j).length == 1)
				show(idx - iMin, j, timeSH);
		}
	}
	if($(document).width() > $(window).width())
	{
		var cursorPos = 100*$(window).scrollLeft()/($(document).width()-$(window).width()); // %
		$("#menu-content").css("backgroundPosition", cursorPos+"% 0");
		$("#date-menu").text(Math.floor(cursorPos*100/100+1920));
		if($(window).scrollLeft() > 46)
			$("#date-menu").css("left", "calc(" + cursorPos + "% - 46px)");
		else
			$("#date-menu").css("left", "6px");
		$("#pointer-menu").css("left", "calc(" + (cursorPos*(1-$(".first").width()/$(window).width())) + "% + " + ($(".first").width()-11) + "px)");
	}
})

function onLeft(idx){
	scroll(0);
}
function onRight(idx){
	scroll($(document).width());
}
function scroll(scroll){
	$('html, body').animate({
		scrollLeft: scroll
	}, 800);
}
function onBlock(i, j) {
	// set content
	//if(!contentVisible)
		// content must be set to visible
}
function onNull() {
	//content must be hidded
}