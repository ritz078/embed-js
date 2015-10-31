class Background {
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
    }

    process() {
        let itemsCount = Math.floor($(window).width() / 60);
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
}

new Background().process();

$('.typed').typed({
    strings: [
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
    ],
    typeSpeed: 30,
    loop:true
})
