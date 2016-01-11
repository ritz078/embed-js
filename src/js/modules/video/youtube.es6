import { truncate, ifInline } from '../utils.es6'
import { getDetailsTemplate, template, inlineEmbed, normalEmbed } from './../helper.es6'
import '../../vendor/fetch.js'

export default class Youtube {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
		this.service = 'youtube'
	}

	static formatData(data, truncate) {
		return {
			title         : data.snippet.title,
			thumbnail     : data.snippet.thumbnails.medium.url,
			rawDescription: data.snippet.description,
			views         : data.statistics.viewCount,
			likes         : data.statistics.likeCount,
			description   : truncate(data.snippet.description, 150),
			url           : `https://www.youtube.com/watch?v=${data.id}`,
			id            : data.id,
			host          : 'youtube'
		}
	}

	async data(id) {
		try {
			let url      = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${this.options.googleAuthKey}&part=snippet,statistics`;
			let response = await fetch(url);
			let data     = await response.json();
			return data.items[0];
		} catch (error) {
			console.log(error);
		}
	}

	static async urlToText(_this, match, url, normalEmbed){
		let id = normalEmbed ? match[1] : match[2];
		let embedUrl = `https://www.youtube.com/embed/${id}`;
		let data;
		if (_this.options.videoDetails){
			data = await _this.data(id);
			return getDetailsTemplate(Youtube.formatData(data, truncate), data, embedUrl,_this.options)
		} else {
			return template(embedUrl, _this.options);
		}
	}

	async process() {
		try {
			if (!ifInline(this.options, this.service)) {
				this.output = await inlineEmbed(this, Youtube.urlToText)
			} else {
				this.embeds = await normalEmbed(this, Youtube.urlToText)
			}

		} catch (error) {
			console.log(error)
		}

		return [this.output, this.embeds];
	}
}

