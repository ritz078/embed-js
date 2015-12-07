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
});

$('.nav').sidr({
  side:'right',
  name:'sidr-right'
});

$('.navbar').sidr({
  side:'left',
  name:'left-nav',
  displace:false
});

window.onresize = function(){
  if (window.innerWidth > 480){
    $.sidr('close','sidr-right')
  }
  if(window.innerWidth > 800){
    $.sidr('open','left-nav')
  }else{
    $.sidr('close','left-nav')
  }
};

$('#left-nav').click(function(){
  if(window.innerWidth < 800) $.sidr('close','left-nav')
});

if(window.innerWidth > 800){
  $.sidr('open','left-nav')
}else{
  $.sidr('close','left-nav')
}
