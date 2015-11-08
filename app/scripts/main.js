class Banner {
    constructor() {
        this.items = [
            'soundcloud',
            'music',
            'spotify',
            'github',
            'vimeo',
            'flickr',
            'instagram',
            'smile-o',
            'code',
            'link',
            'twitter',
            'youtube',
            'jsfiddle',
            'codepen',
            'vine',
            'play'
        ];

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

    process() {
        $('.banner .row').remove();
        let itemsCount = Math.floor($(window).width() / 61);
        let rowCount = 3;
        let str = '';
        let result = ''
        for (let j = 0; j < rowCount; j++) {
            str = ''
            for (let i = 0; i <= itemsCount; i++) {
                let item = this.items[Math.floor(Math.random() * this.items.length)];
                str += `<div class="row-elem"><i class="fa fa-${item} fa-fw"></i></div>`
            }
            result += `<div class="row">${str}</div>`;
        }
        $('.banner').prepend(result.repeat(2));
    }

    fade() {
        let i = 0;
        let $typed = $('.typed');
        let self = this;
        setInterval(() => {
            $typed.fadeOut('slow', function() {
                $(this).html(self.strings[i]).fadeIn();
            });
            i === this.strings.length ? i = 0 : i++;
        }, 2000);
    }
}

var banner = new Banner();
banner.process();

$(window).resize(function() {
    banner.process();
})
