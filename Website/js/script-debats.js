// load the mindmap
$(document).ready(function() {
  // enable the mindmap in the body
  $('body').mindmap();

  // add the data to the mindmap
  var root = $('body>ul>li').get(0).mynode = $('body').addRootNode($('body>ul>li>a').text(), {
    href:'/',
    url:'/',
    onclick:function(node) {
      onNodeClick(node);
    	$(node.obj.activeNode.content).each(function() {
    		this.hide();
    	});
    }
  });
  $('body>ul>li').hide();
  var addLI = function() {
    var parentnode = $(this).parents('li').get(0);
    if (typeof(parentnode)=='undefined') parentnode=root;
      else parentnode=parentnode.mynode;

    this.mynode = $('body').addNode(parentnode, $('a:eq(0)',this).text(), {
      href:$('a:eq(0)',this).attr('href'),
      onclick:function(node) {
        onNodeClick(node);
        $(node.obj.activeNode.content).each(function() {
          this.hide();
        });
        $(node.content).each(function() {
          this.show();
        });
      }
    });
    $(this).hide();
    $('>ul>li', this).each(addLI);
  };
  $('body>ul>li>ul').each(function() {
    $('>li', this).each(addLI);
  });
  // background colors
  $('a[href="/"]').addClass("color0");
  $('a[href="01"]').addClass("color01");
  for (var i = 1; i < 6; i++)
    $('a[href="' + i + '"]').addClass("color1");
  $('a[href="02"]').addClass("color02");
  for (var i = 6; i < 10; i++)
    $('a[href="' + i + '"]').addClass("color2");
  $('a[href="03"]').addClass("color03");
  for (var i = 10; i < 12; i++)
    $('a[href="' + i + '"]').addClass("color3");

});

titles = ["Temps libéré", "Plasir de conduire", "Démocratisation par étapes", "Conduire ivre", "Fluidité du traffic",
    "Cohabitation dangereuse", "Qui est responsable ?", "Le constructeur devient assureur", "'Trolley problem'",
    "Diminution des accidents", "Piratage"];
content = ["Le temps libéré dans les transports pourra être réinvesti, par exemple à travailler, se détendre ... La voiture autonome nous rendra t-elle plus libres ?",
    "Il faut penser que la conduite est, pour beaucoup, considérée comme un plaisir : course automobile, circuit de course, karting, jeux videos de simulation de conduite... En plus de se demander s’il est sage de se passer de ce plaisir pour gagner du temps de travail, il faudra savoir si l’on choisit de s’orienter vers des voitures totalement autonome ou juste partiellement, sur commande et dans certaines conditions.",
    "Si les voitures autonomes se démocratisent, aura t’on le droit de rouler à l’étranger avec sa voiture ? Les normes évolueront-elles à la même vitesse partout ? A plus petite échelle, la voiture autonome sera t’elle adaptée et intégrée à la fois dans les villes, sur les autoroutes, dans les routes de campagnes ? Va t’on vers un mode de transport hyper-spécialisé ? Qui pourra acheter une voiture autonome ?",
    "La voiture autonome permettrait aussi de conduire sans être en possession de toutes ses capacités : handicap, alcool, sommeil ou juste fatigue... La voiture autonome nous rendra t-elle plus libres ?",
    "Du fait d’une nouvelle façon de concevoir le transport, probablement plus rationnelle grâce à l’automatisation et à l’intercommunication en- tre véhicules, la construction des routes et l’urbanisme évolueraient. Pour les mêmes raisons, les embouteillages sont susceptibles de devenir très rares.",
    "La cohabitation des voitures autonomes avec les humains amène des complications non seulement techniques mais aussi en terme de responsabilité ( qui est responsable si une voiture autonome cogne une voiture traditionnelle ? )sachant que les voitures autonomes provoquent moins d’accidents.",
    "Qui est responsable en cas d’accident ? Les deux voitures ? Une seule ? le programmeur ? l’acheteur de la voiture (en particulier s’il modifie sa voiture) ? le constructeur ?",
    "Les constructeurs se proposent de prendre en charge le rôle de l’assureur qui sera à redéfinir, se portant garants de la sécurité de leurs véhicules. Quel serait le nouveau rôle, l’influence des constructeurs automobiles avec l’avènement de la voiture autonome ?",
    "Se pose aussi la question de la gestion de ces accidents, la voitures autonome prend en permanence des décisions en connaissance de cause. Ces décisions sont déterminées par sa programmation, dans le cas d’un accident il faut savoir comment faire réagir la voiture en fonction des données qu’elle possède : ” tuer 10 personnes ou seulement le conducteur ? ”, c’est un dilemme psychologique, le Trolley problem.",
    "Actuellement, 90 pourcents des accidents de la route sont causés uniquement par l’Homme, avec la conduite assistée on peut anticiper que que le nombre de morts sur la route diminuera énormément. En contrepartie on peut penser que les défaillances matérielles seront plus nombreuses du fait de la complexité accrue des véhicules.",
    "En dehors du problème des accidents, de nouvelles vulnérabilités apparaissent avec l’assistance que l’on ajoute à un véhicule. Tous les sous-systèmes ont tendance à être connectés et communiquant, on peut les attaquer, plusieurs exemples ont été très médiatisés d’attaque contre des voitures, il est possible d’en prendre le contrôle. Quel niveau de sécurité présenteront les voitures ? Y aura t’il une différence de sécurité informatique sensible dans le prix d’achat ?",]

var displayed = 0;

function onNodeClick(e)
{
	if (e.href != displayed)
		$('a[href="' + displayed + '"]').html("<div class=\"leave\">" + titles[displayed-1] + "</div>");
	if(e.href !== undefined && e.href != "/" && e.href[0] != '0') {
		displayed = e.href;
		$("#" + e.href).children(".text").css("display", "inline");
		$('a[href="' + e.href + '"]').html("<div class=\"leave\"><div class='nodeTitle'>" + titles[e.href-1] + "</div>" + content[e.href-1] + "</div>");
	}
}
