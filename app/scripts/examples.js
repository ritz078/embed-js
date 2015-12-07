$('.left-nav a').click(function(e) {
    e.preventDefault()
    var id = $(this).attr('href')
    $('html,body').animate({
            scrollTop: $(id).offset().top - 70
        },
        'slow');
})

$('.nav').sidr({
  side:'right',
  name:'sidr-right'
});

window.onresize = function(){
  if (window.innerWidth > 480){
    $.sidr('close','sidr-right')
  }
};

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
