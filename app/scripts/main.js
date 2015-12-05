class Banner {
  constructor() {
    this.strings = [
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

    this.fade();
  }

  fade() {
    let i      = 0;
    let $typed = $('.typed');
    let self   = this;
    setInterval(() => {
        $typed.fadeOut('slow', function () {
          $(this).html(self.strings[i]).fadeIn();
        });
        i === this.strings.length ? i = 0 : i++;
      },
      2000
    )
    ;
  }
}

var banner = new Banner();

