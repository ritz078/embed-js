$('.element').embedJS();

$('.element2').embedJS({
  gdevAuthKey:'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts'
});

$('.element3').embedJS();

$('.element5').embedJS({
  audioEmbed:true
});
hljs.initHighlightingOnLoad();

$(document).ready(function(){
  $('ul>a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-60
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
  $('.about a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-60
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
});
