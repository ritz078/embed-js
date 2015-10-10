import utils from './utils.es6';

class Twitter {
    constructor(input, options) {
        this.input = input;
        this.options = options;
        this.regex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;
    }

    async tweetData(url) {
        let config = this.options.tweetOptions;
        let apiUrl = `https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=${url}&maxwidth=${config.maxWidth}&hide_media=${config.hideMedia}&hide_thread=${config.hideThread}&align=${config.align}&lang=${config.lang}`;
        let response = await fetchJsonp(apiUrl, {
            credentials: 'include'
        });
        let data = await response.json();
        return data;
    }

    matches() {
        let x;
        return (x = this.input.match(this.regex)) ? x : null;
    }

    load() {
        twttr.widgets.load(this.options.element);
    }

    async process() {
        var result = this.input;
        let matches = utils.getUnique(this.matches());
        for (let match of matches) {
            let data = await this.tweetData(match);
            result += data.html;
        }
        return result;
    }
}

module.exports = Twitter;
