var timeSH = 400; // temps de show/hide d'un block
var blockW = ($(window).height() - 60) * 0.33 * 0.5; // width d'un block
var minDate = 1945; // première date de la timeline
var maxDate = 2020; // dernière date de la timeline
var minTime = 1; // distance minimum entre deux dates (évite le chevauchement)
var lastScrollLeft = 0; // used to determine scroll direction
var blockShow = [[0, 0], [0, 0], [0, 0]]; // first idx show / last idx show for each line

var Event = function(date, datePlus, title, logo, size, desc, link) {
   this.date = date;
   this.datePlus = datePlus;
   this.title = title;
   this.logo = logo;
   this.size = size; // 1 tiny, 2 small, 3 normal, 4 large
   this.desc = desc;
   this.link = link;
};

var eventsTech = [	new Event(1945, "", "Invention du régulateur de vitesse", null, 3, "", null),
					new Event(1950, "Années", "Invention de la direction assistée", null, 3, "", null),
					new Event(1980, "Années", "Premiers essais de véhicules autonomes", null, 3, "", null),
					new Event(1985, "Juillet", "Loi Badinter", "list-alt", 3, "La Loi Badinter stipule que les dommages causés par un véhicule sont quasiment toujours imputables au conducteur de l’engin, sauf si la victime a commis une faute inexcusable qui a exclusivement causé l’accident.", null),
					new Event(2005, "2004 et", "DARPA Grand Challenge.", null, 3, "DARPA Grand Challenge : course de véhicules autonomes.", null),
					new Event(2009, "", "Projet de la Google Car", null, 2, "Lancement du projet de la Google Car", null),
					new Event(2010, "Années", "Projet de développement de voitures autonomes", null, 2, "Lancement de projet de développement de voitures autonomes", null),
					new Event(2012, "Août", "300 000 miles dépassée par les Google Car", "road", 3, "Barre des 300 000 miles dépassée par la flotte de Google Car", null),
					new Event(2015, "", "Software Autopilot - Tesla", null, 3, "Mise en place du Software Autopilot de Tesla", "https://en.wikipedia.org/wiki/Tesla_Motors")];

var eventsLaw = [	new Event(1968, "", "Convention de Vienne", "list-alt", 3, "Convention de Vienne : circulation routière", null),
					new Event(1990, "Années", "Démocratisation de la direction assistée", null, 3, "", "http://www.larousse.fr/archives/journaux_annee/1995/177/automobile_questions_sur_le_futur"),
					new Event(2004, "", "Limiteur de vitesse obligatoire", null, 3, "Les nouveaux véhicules sont obligatoirement équipés d'un limiteur de vitesse", "http://www.securite-routiere.gouv.fr/medias/espace-presse/publications-presse/limiteur-et-regulateur-de-vitesse-quelques-definitions-apportees-par-la-securite-routiere"),
					new Event(2011, "", "Premier état autorisant les voitures autonomes", null, 3, "Premier état américain à autoriser la circulation des voitures autonomes", null),
					//new Event(2015, "", "Les véhicules autonomes en France", null, 2, "La loi de la transition énergétique portée par Ségolène Royal confère au gouvernement français le recours aux ordonnances pour permettrent la circulation des véhicules autonomes", null),
					new Event(2015, "Juin", "McKinsey redéfinit le monde automobile", "list-alt", 2, "Publication par McKinsey d'un rapport sur l'éventuelle redéfinition du monde de l'automobile par les véhicules autonomes", "http://www.mckinsey.com/industries/automotive-and-assembly/our-insights/ten-ways-autonomous-driving-could-redefine-the-automotive-world"),
					new Event(2015, "Octobre", "Porsche revendique le plaisir de conduire", null, 2, "Oliver Blume, PDG de Porsche, revendique le plaisir de conduire face à l'essor du développement des voitures autonomes et annonce que Porsche ne se lancera pas dans la course à la voiture autonome.", "http://www.frandroid.com/produits-android/automobile/339524_porsche-et-lamborghini-ne-veulent-pas-de-voitures-autonomes"),
					new Event(2016, "Février", "L'intelligence artificielle devient responsable", null, 2, "La NHTSA accepte de considérer l'intelligence artificielle de la Google Car comme le conducteur responsable du véhicule", "http://droitdu.net/2016/03/vers-un-encadrement-juridique-de-la-voiture-autonome/"),
					new Event(2016, "Mars", "Révision de la Convention de Vienne", "list-alt", 2, "Annonce de la révision de la Convention de Vienne pour l'autorisation des véhicules autonomes conformes aux réglementations des Nations Unies", null)];

var eventsDiv = [	new Event(1957, "", "Les véhicules autonomes dans la littérature", "book", 3, "Premières apparitions de véhicules autonomes dans la littérature", null),
					new Event(2015, "Décembre", "Stephen Boulder prévient du danger de la conduite assistée", null, 2, "Stephen Boulder, ingénieur chez Jaguar, estime que la conduite semi-automatique est dangereuse et crée un fausse impression de sécurité", null),
					new Event(2015, "Octobre", "Volvo prend la responsabilité de ses véhicules autonomes", null, 3, "Annonce de l'entière responsabilité de ses véhicules autonomes assumée par Håkan Samuelsson (PDG Volvo)", "http://fortune.com/2015/10/07/volvo-liability-self-driving-cars/"),
					new Event(2016, "Février", "Accrochage d'une Google Car", "fire", 2, "Accrochage mineure d'une Google Car Lexus avec un bus sur une route Californienne", "https://www.wired.com/2016/02/googles-self-driving-car-may-caused-first-crash/"),
					new Event(2016, "Avril", "Les 10 questions de Consumer Watchdog à Google", null, 2, "Les 10 questions de Consumer Watchdog adressées à Google au sujet de la sécurité en marge du NHTSA", "http://www.consumerwatchdog.org/newsrelease/google%E2%80%99s-proposal-%E2%80%9Cfast-track%E2%80%9D-approval-driverless-cars-threat-public-safety-consumer-wa"),
					new Event(2020, "", "Objectif zéro mort ou blessé grave", null, 3, "Objectif zéro mort ou blessé grave dans un accident impliquant un véhicule récent de la marque Volvo", null)];

// Horizontal scrolling
$(function(){
	$("body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 34);
		event.preventDefault();
	});
});

$(document).ready(function(){
	timelineCreator (); // génère tous les blocks sur la timeline
	timelineCalibrate(); // Gère l'affichage ou non des blocks et initialise "blockShow"
	$("table").click(function() {onNull();});
	onNull();
});

// hide a block
function hide(i, j, time) {
	$('#block'+i+j).animate({
		backgroundSize: '10%'
	}, time);
	$('#block'+i+j).find('.block').slideUp(time*2/3);
}
// show a block
function show(i, j, time, event) {
	$('#block'+i+j).animate({
		backgroundSize: '100%'
	}, time);
	$('#block'+i+j).find('.block').slideDown(time);
}

// Scrolling event
$(window).scroll(function(){
	if($(window).scrollLeft() > lastScrollLeft) { // scroll to right
		for(var i = 1; i <= 3; i++) {
			if($("#block" + i + (blockShow[i-1][0])).length == 1) {
				var posX = $("#block" + i + (blockShow[i-1][0])).offset().left;
				if(posX < $(window).scrollLeft()) {
					hide(i, blockShow[i-1][0], timeSH);
					blockShow[i-1][0]++;
				}
			}
			if($("#block" + i + (blockShow[i-1][1]+1)).length == 1) {
				var posX = $("#block" + i + (blockShow[i-1][1]+1)).offset().left;
				if(posX < $(window).width() + $(window).scrollLeft() - blockW) {
					blockShow[i-1][1]++;
					show(i, blockShow[i-1][1], timeSH);
				}
			}
		}
	}
	else { //scroll to left
		for(var i = 1; i <= 3; i++) {
			if($("#block" + i + (blockShow[i-1][0]-1)).length == 1) {
				var posX = $("#block" + i + (blockShow[i-1][0]-1)).offset().left;
				if(posX > $(window).scrollLeft()) {
					blockShow[i-1][0]--;
					show(i, blockShow[i-1][0], timeSH);
				}
			}
			if($("#block" + i + (blockShow[i-1][1])).length == 1) {
				var posX = $("#block" + i + (blockShow[i-1][1])).offset().left;
				if(posX > $(window).width() + $(window).scrollLeft() - blockW) {
					hide(i, blockShow[i-1][1], timeSH);
					blockShow[i-1][1]--;
				}
			}
		}
	}
	if($(document).width() > $(window).width()) {
		var winW = $(window).width(); // window width
		var cursorPos = 100*$(window).scrollLeft()/($(document).width()-winW); // scrolling position (%), 0:left, 100:right
		$("#menu-content").css("backgroundPosition", cursorPos+"% 0"); // set cursor position into mini-timeline
		$("#date-menu").text(Math.floor(cursorPos*(maxDate-minDate)/100+minDate)); // set date into mini-timeline
		if($(window).scrollLeft() > 220) // if scroll > 200
			$("#date-menu").css("left", "calc(" + cursorPos + "% - 50px)"); // set position of the date into mini-timeline
		else
			$("#date-menu").css("left", "6px"); // set position of the date into mini-timeline stick on left
		var tdW = $("#firstTd").width(); // width of the first td
		var pointerPos = (cursorPos*(winW-blockW/2-(tdW+blockW/2))/100+tdW+blockW/2-30);
		$("#pointer").css("left", pointerPos + "px"); // set pointer position
		$("#pointer2").css("left", (pointerPos+10) + "px"); // set pointer2 position
	}
	lastScrollLeft = $(window).scrollLeft();
})

// go on the left of the timeline
function onLeft(idx){
	scroll(0);
}

// go on the right of the timeline
function onRight(idx){
	scroll($(document).width());
}

// smooth scrolling
function scroll(scroll){
	var time = 1000;
	if(Math.abs(scroll - $(window).scrollLeft()) > 3000)
		time = 2000;
	else if(Math.abs(scroll - $(window).scrollLeft()) < 1000)
		time = 600;
	$('html, body').animate({
		scrollLeft: scroll
	}, time);
}

// lorsque l'on click sur un block
function onBlock(id) {
	var e = id2e(id);
	$("#content").children(".title").text(e.title);
	$("#content").children(".date").text(e.datePlus + " " + e.date);
	$("#content").children(".desc").text(e.desc);
	$("#content").children(".infos").text("Catégorie : " + i2str(id.substr(5, 1)));
	if(e.link != null)
		$("#content").children(".link").html("<a href=\"" + e.link + "\"><span class=\"glyphicon glyphicon-link\" aria-hidden=\"true\"></span> source</a>");
	else
		$("#content").children(".link").html("");

	if($("#content").css("display").localeCompare("none") == 0)
		$("#content").animate({width:'toggle'},350);
	event.stopImmediatePropagation();
}

// get category (string) from position (idx)
function i2str(i) {
	switch (i) {
		case "1": return("Technique");
		case "2": return("Juridique");
		case "3": return("Divers");
	}
	return("");
}

// lorsque l'on clics a coté d'un block
function onNull() {
	if($("#content").css("display").localeCompare("none") != 0)
		$("#content").animate({width:'toggle'},350);
}

// Get Event from block id
function id2e(id) {
	id = id.substr(5);
	var i = id.substr(0, 1);
	var j = id.substr(1);
	es = null;
	switch(i) {
		case "1": es = eventsTech; break;
		case "2": es = eventsLaw; break;
		case "3": es = eventsDiv; break;
		default: return null;
	}
	return(es[j-1]);
}

// génère tous les blocks sur la timeline
function timelineCreator() {
	var htmlEventsTech = "";
	var htmlEventsLaw = "";
	var htmlEventsDiv = "";
	var time = maxDate - minDate;
	var maxW = time * blockW / minTime;
	var tdW = $("#firstTd").width();
	var top, basicTop = $("#technology").height()/2-blockW/2;
	for(var pos = 0; pos < 3; pos++) {
		switch(pos) {
			case 0: es = eventsTech; break;
			case 1: es = eventsLaw; break;
			case 2: es = eventsDiv; break;
		}
		for(var i = 0; i < es.length; i++) {
			var e = es[i];
			htmlEventsTech += "<div class=\"block " + size2class(e.size) + "\" id=\"block" + (pos+1) + (i+1) + "\" style=\"left:" + ((e.date-minDate)*maxW/time+tdW) + "px;top:" + size2top(es, pos, i) + "px;\">" + 
				"<div class=\"containerBlock\"><div class=\"date\">" + e.date + "</div><div class=\"fact\">" + e.title + "</div>";
			if(e.logo != null)
				htmlEventsTech += "<div class=\"logo\"><span class=\"glyphicon glyphicon-" + e.logo + "\" aria-hidden=\"true\"></span></div>";
			htmlEventsTech += "</div></div>\n";
		}
	}
	$("#techTimeline").html(htmlEventsTech);
	$("#lawTimeline").html(htmlEventsLaw);
	$("#diversTimeline").html(htmlEventsDiv);
	$(".timelineTd").each(function() {$(this).css("width", (maxW+blockW*2*0.75) + "px")});
}

// Gère l'affichage ou non des blocks et initialise "blockShow"
function timelineCalibrate() {
	for(var i = 1; i <= 3; i++) {
		var showIdx = -1; // -1:begin, 0:show, 1:end
		var previousPos = -1; // position in px of the previous block
		for(var j = 1; j <= 100; j++) {
			if($("#block" + i + j).length == 1) {
				var posX = $("#block" + i + j).offset().left;
				if(showIdx != 1 && posX < $(window).width() + $(window).scrollLeft() - blockW && posX > $(window).scrollLeft()) {
					show(i, j, 0);
					if (showIdx == -1) {
						blockShow[i-1][0] = j;
						showIdx = 0;
					}
				}
				else {
					hide(i, j, 0);
					if(showIdx == 0) {
						blockShow[i-1][1] = j-1;
						showIdx = 1;
					}
				}
				if(previousPos < $(window).scrollLeft() && posX > $(window).width() + $(window).scrollLeft() - blockW) {
					blockShow[i-1][0] = j;
					blockShow[i-1][1] = j-1;
				}
				$("#block" + i + j).click(function(event) {onBlock(this.id, event);});
				previousPos = posX;
			}
			else {
				if(blockShow[i-1][0] == 0) {
					blockShow[i-1][0] = j;
					blockShow[i-1][1] = j-1;
				}
				break;
			}
		}
	}
}

function size2class (size) {
	switch(size) {
		case 3: return("normal");
		case 2: return("small");
		case 1: return("tiny");
		case 4: return("large");
	}
	return("");
}

// size : cf Event class size
// date : cf Event class date
// pos : 0,1,2
// i : event pos
function size2top (es, pos, i) {
	var top = $("#technology").height()*(2*pos+1)/2;
	var tmpBlockW = 0;
	switch(es[i].size) {
		case 3: tmpBlockW = blockW*2*0.75; break;
		case 2: tmpBlockW = blockW*2*0.66; break;
		case 1: tmpBlockW = blockW*2*0.5; break;
		case 4: tmpBlockW = blockW*2*0.9; break;
	}
	top -= tmpBlockW/2;
	if(i < es.length-1 && es[i+1].date == es[i].date)
		top -= (tmpBlockW-$("#technology").height())/2;
	else if (i > 0 && es[i-1].date == es[i].date)
		top += (tmpBlockW-$("#technology").height())/2;
	return(top);
}