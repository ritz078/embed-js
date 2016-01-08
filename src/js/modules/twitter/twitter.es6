import utils from '../utils.es6'
import '../../vendor/fetch.js'
import fetchJsonp from '../../vendor/fetch_jsonp.js'
import {inlineEmbed, normalEmbed} from '../helper.es6'

export default class Twitter {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;
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
		let config   = this.options.tweetOptions;
		let apiUrl   = `https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=${url}&maxwidth=${config.maxWidth}&hide_media=${config.hideMedia}&hide_thread=${config.hideThread}&align=${config.align}&lang=${config.lang}`;
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

	static async urlToText(_this, match, url){
		let data = await _this.tweetData(url);
		return data.html;
	}

	async process() {
		try {
			if (!utils.ifInline(this.options, this.service)) {
				this.output = await inlineEmbed(this, Twitter.urlToText);
			} else {
				this.embeds = await normalEmbed(this, Twitter.urlToText);
			}
			return [this.output, this.embeds];

		} catch (error) {
			console.log(error);
		}
	}
}
