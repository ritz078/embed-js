var context = {
    data: [{
    	'id': 'basic',
    	'title':'Basic Example',
    	'codepen':'http://codepen.io/ritz078/pen/QjZded',
    	'text':'Pellentesque habitant morbi tristique senectus :smile: et netus buff.ly/1NU7Mnk et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, http://riteshkr.com/embed.js tempor :) sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies bit.ly/1NSYCaf mi vitae est. Mauris placerat eleifend leo.',
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
