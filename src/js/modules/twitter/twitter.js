import fetchJsonp from 'fetch-jsonp'
import { asyncEmbed } from '../../helpers'
import regex from '../regex'

export default class Twitter {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex.twitter;
		this.service = 'twitter';

		this.load = this.load.bind(this);
		if(typeof this.options.input !== 'string'){
			this.options.input.addEventListener('rendered', this.load, false);
		}
	}

	/**
	 * Fetches the data from twitter's oEmbed API
	 * @param  {string} url URL of the tweet
	 * @return {object}     data containing the tweet info
	 */
	tweetData(url) {
		let config = this.options.tweetOptions;
		let apiUrl = `https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=${url}&maxwidth=${config.maxWidth}&hide_media=${config.hideMedia}&hide_thread=${config.hideThread}&align=${config.align}&lang=${config.lang}`;
		return new Promise((resolve) => {
			fetchJsonp(apiUrl, {credentials: 'include'})
				.then((data)=>data.json())
				.then((json)=>resolve(json))
		})
	}

	/**
	 * Load twitter widgets
	 * @return null
	 */
	load() {
		const twitter = this.options.plugins.twitter;
		twitter.widgets.load(this.options.element); //here this refers to the element

		//Execute the function after the widget is loaded
		twitter.events.bind('loaded', this.options.onTweetsLoad);
	}

	static urlToText(_this, match, url) {
		return new Promise((resolve) => _this.tweetData(url).then((data) => resolve(data.html)))
	}

	process() {
		return new Promise((resolve) => asyncEmbed(this, Twitter.urlToText).then((data) => resolve(data)))
	}
}
