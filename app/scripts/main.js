"use-strict";

hljs.initHighlightingOnLoad();

$(document).ready(function(){
  $('.nano-content>a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-60
    }, 200, 'swing', function () {
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
  $('ol>li>p a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-60
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
  $('li a[href^="#"]').on('click',function (e) {
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
$('.collapsible-header').click(function(){
  setTimeout(
    function() {
      $(".nano").nanoScroller();
    },
    200);
});
