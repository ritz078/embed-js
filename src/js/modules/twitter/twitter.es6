const utils = require('../utils.es6');

class Twitter {
    constructor(input, options, embeds) {
        this.input = input;
        this.options = options;
        this.embeds = embeds;
        this.regex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;

        this.load = this.load.bind(this)
        this.options.element.addEventListener('rendered', this.load, false);
    }

    /**
     * Fetches the data from twitter's oEmbed API
     * @param  {string} url URL of the tweet
     * @return {object}     data containing the tweet info
     */
    async tweetData(url) {
        let config = this.options.tweetOptions;
        let apiUrl = `https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=${url}&maxwidth=${config.maxWidth}&hide_media=${config.hideMedia}&hide_thread=${config.hideThread}&align=${config.align}&lang=${config.lang}`;
        let response = await fetchJsonp(apiUrl, {
            credentials: 'include'
        });
        let data = await response.json();
        return data;
    }

    /**
     * Load twitter widgets
     * @return {}
     */
    load() {
        twttr.widgets.load(this.options.element); //here this refers to the element

        //Execute the function after the widget is loaded
        twttr.events.bind('loaded', () => {
            this.options.onTweetsLoad();
        });
    }

    async process() {
        try {
            let match;
            while ((match = utils.matches(this.regex, this.input)) !== null) {
                let data = await this.tweetData(match[0]);
                this.embeds.push({
                    text: data.html,
                    index: match.index
                })
            }
            return this.embeds;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Twitter;
