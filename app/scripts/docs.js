hljs.initHighlightingOnLoad();

let data = []

$('h5').each(function(){
	data.push($(this).html())
})

let str = ''

$.each(data,function(){
	str+=`<a href="#${this}"><li>${this}</li></a>`
})

$('.left-nav ul').html(str)

$('.left-nav a').click(function(e) {
    e.preventDefault()
    var id = $(this).attr('href')
    $('html,body').animate({
            scrollTop: $(id).offset().top - 70
        },
        'slow');
})
