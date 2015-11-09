var context = {
    data: [{
    	'id': 'basic',
    	'title':'Basic Example',
    	'codepen':'http://codepen.io/ritz078/pen/QjZded',
    	'text':'Lotus :smile: eleates vix attrahendams luna est.Advenas mori!Fermiums prarere in cubiculum!Cum cacula cantare, omnes stellaes manifestum azureus, nobilis https://angularjs.org/ acipenseres.Cum orgia mori, omnes rationees <3 experientia alter, regius :heart: mortemes.Devatios persuadere, tanquam secundus spatii.Heu, barcas!Cedriums observare!A falsis, buff.ly/1NU7Mnk lacta talis imber. :P Cur eleates peregrinatione?',
		'jsCode':
`var basicDemo = new EmbedJS({
    element: document.getElementById('basic-result')
});
basicDemo.render();`
    },{
        'id': 'youtube',
        'title': 'Youtube with Preview',
        'codepen': 'http://codepen.io/ritz078/pen/JYmJML',
        'text': 'Pellentesque habitant morbi tristique senectus :smile: et netus buff.ly/1NU7Mnk et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, http://riteshkr.com/embed.js tempor :) sit amet, https://www.youtube.com/watch?v=sMXMKz7TunQ ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies bit.ly/1NSYCaf mi vitae est. Mauris placerat eleifend leo.',
        'jsCode':
`var ytDemo = new EmbedJS({
    element: document.getElementById('youtube'),
    googleAuthKey : 'xxxxxxxxxxxxxxx'
});
ytDemo.render();`
    },{
        'id':'gmap',
        'title':'Google Map',
        'codepen':'http://codepen.io/ritz078/pen/OyBrgX',
        'text':'Cur rumor nocere?Emeritis adelphis satis perderes domina est.Gloss cadunt in bi-color brema! @(IIT Roorkee) Bi-color habitio virtualiter imitaris amicitia est.Teres tatas ducunt ad racana.Genetrixs prarere in rugensis civitas!',
        'jsCode':
`var gMap = new EmbedJS({
    element: document.getElementById('gmap-text'),
    googleAuthKey: 'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts'
});
gMap.render();`
    },{
        'id':'codeHighlight',
        'title':'Code Embed',
        'codepen':'http://codepen.io/ritz078/pen/RWemXM',
        'text':'`<script></script>` www.ng-conf.org http://www.iitr.ac.in ROTFL!!!! Now this explains :P why Kejriwal & his Nocere cito ducunt ad noster domina.Salvus nutrixs ducunt ad decor.Grandis torquis sed mire visums xiphias est.```javascript\ngrade = (student, period=(if b? then 7 else 6)) ->\nif student.excellentWork\n"A+"\nelse if student.okayStuff\nif student.triedHard then "B" else "B-"\nelse\n"C"\nclass Animal extends Being\nconstructor: (@name) ->\nmove: (meters) ->\nalert @name + " moved #{meters}m."\n```with Yogendra Yadav. Because he had praised Narendra :smile: Modi and Gujarat model in an interview.Checkthis 1-min clip in which Yogendra Yadav openly praises Modis Gujarat development :https://vimeo.com/119199079',
        'jsCode':
`var code = new EmbedJS({
    element: document.getElementById('code-text')
});
code.render();`
    },{
        'id':'markdown',
        'title':'Markdown',
        'codepen':'http://codepen.io/ritz078/pen/bVmPrX',
        'text':
`
embed.js
--------
  \`var x = 5\` www.ng-conf.org http://www.iitr.ac.in ROTFL!!!! Now this explains :P why & his Nocere cito ducunt ad noster domina.Salvus nutrixs ducunt ad decor.Grandis torquis sed mire visums xiphias est.

\`\`\`
grade = (student, period=(if b? then 7 else 6)) ->
    if student.excellentWork
      "A+"
    else if student.okayStuff
      if student.triedHard then "B" else "B-"
    else
      "C"
    class Animal extends Being
      constructor: (@name) ->
        move: (meters) ->
        alert @name + " moved #{meters}m."
\`\`\`
[Github](https://github.com/ritz078/embed.js) habitant morbi **tristique** senectus et netus et malesuada fames ac turpis egestas. :+1: Vestibulum tortor quam, ~~feugiat vitae, ultricies eget,~~

this|is a|table
----|----|------
see|its|working

~~tempor sit amet, ante~~ Donec eu libero sit amet quam egestas semper. _Aenean_ ultricies mi vitae est. Mauris placerat eleifend leo https://vimeo.com/119199079
`,
'jsCode':
`var x = new EmbedJS({
  element: document.getElementById('markdown-text'),
  marked:true,
  tweetsEmbed:false
});

x.render();`
    }]

}

let source = $('#template').html();
let template = Handlebars.compile(source);
let html = template(context);

$('.container').append(html);


$('.code-toggle').click(function() {
    let $parent = $(this).parent('.example')
    $parent.find('.tag').fadeToggle().parent('.text').toggleClass('opened')
    $parent.find('.code').slideToggle()
})

/*=======================================
=            Basic demo code            =
=======================================*/

var basicDemo = new EmbedJS({
    element: document.getElementById('basic-text')
});
basicDemo.render();

/*=====  End of Basic demo code  ======*/

/*=====================================
=            Youtube video            =
=====================================*/
var ytDemo = new EmbedJS({
    element: document.getElementById('youtube-text'),
    googleAuthKey: 'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts'
});
ytDemo.render();


/*=====  End of Youtube video  ======*/

/*==================================
=            Google map            =
==================================*/
var gMap = new EmbedJS({
    element: document.getElementById('gmap-text'),
    googleAuthKey: 'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts'
});
gMap.render();


/*=====  End of Google map  ======*/

var code = new EmbedJS({
    element: document.getElementById('codeHighlight-text')
});
code.render();

var markdown = new EmbedJS({
  element: document.getElementById('markdown-text'),
  marked:true,
  tweetsEmbed:false
});

markdown.render();
