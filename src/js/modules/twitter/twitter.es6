import utils from '../utils.es6'
import '../../vendor/fetch.js'
import fetchJsonp from '../../vendor/fetch_jsonp.js'

export class Twitter {
    constructor(input,output, options, embeds) {
        this.input = input;
        this.output = output;
        this.options = options;
        this.embeds = embeds;
        this.regex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;
        this.service = 'twitter';

        this.load = this.load.bind(this);
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
        return await response.json();
    }

    /**
     * Load twitter widgets
     * @return null
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
            if (!utils.ifInline(this.options, this.service)) {
                let regexInline = this.options.link ? new RegExp(`([^>]*${this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${this.regex.source})`, 'gi');
                let match;
                while ((match = utils.matches(regexInline, this.output)) !== null) {
                    let url = this.options.link ? match[0].slice(0, -4) : match[0];
                    let data = await this.tweetData(url);
                    let text = data.html;
                    if (this.options.link) {
                        this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text)
                    } else {
                        this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text)
                    }
                }
            } else {
                let match;
                while ((match = utils.matches(this.regex, this.input)) !== null) {
                    let data = await this.tweetData(match[0]);
                    this.embeds.push({
                        text: data.html,
                        index: match.index
                    })
                }
            }
            return [this.output, this.embeds];

        } catch (error) {
            console.log(error);
        }
    }
}
