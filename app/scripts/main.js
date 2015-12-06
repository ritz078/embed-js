var strings = [
  'MARKDOWN',
  'SOUNDCLOUD.',
  'MP4 VIDEOS.',
  'SPOTIFY.',
  'VIMEO VIDEOS.',
  'FLICKR IMAGES.',
  'INSTAGRAM IMAGES.',
  'TEXT SMILEYS.',
  'HIGHLIGHTED CODE',
  'HTML LINKS.',
  'TWEETS.',
  'YOUTUBE VIDEOS.',
  'JSFIDDLE CODE',
  'CODEPEN CODE',
  'VINE VIDEOS.',
  'GITHUB GISTS.',
  'DAILYMOTION VIDEOS.',
  'LIVELEAK VIDEOS.',
  'USTREAM VIDEOS.',
  'JSBIN CODE',
  'PLUNKER CODE.',
  'MP3 SONGS'
];


function fade() {
  var i      = 0;
  var $typed = $('.typed');
  setInterval(function () {
    $typed.fadeOut('slow', function () {
      $(this).html(strings[i]).fadeIn();
    });
    i === strings.length ? i = 0 : i++;
  }, 2000);
}

function isRetina(){
  var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

  if (window.devicePixelRatio > 1) {
    return true;
  }

  return !!(window.matchMedia && window.matchMedia(mediaQuery).matches);
}

function lazyload($elem){
  var url = isRetina() ? $elem.data('lazy-retina'): $elem.data('lazy');
  let image = new Image();
  image.src = url;
  image.onload = function () {
    $elem.attr('src',url);
  };
}

lazyload($('.browser'));

fade();
