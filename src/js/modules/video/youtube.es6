import utils from '../utils.es6'
import helper from './../helper.es6'
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

	static formatData(data, utils) {
		return {
			title         : data.snippet.title,
			thumbnail     : data.snippet.thumbnails.medium.url,
			rawDescription: data.snippet.description,
			views         : data.statistics.viewCount,
			likes         : data.statistics.likeCount,
			description   : utils.truncate(data.snippet.description, 150),
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

	static async urlToText(_this, match){
		let id = match[2];
		let embedUrl = `https://www.youtube.com/embed/${id}`;
		let data;
		if (_this.options.videoDetails){
			data = await _this.data(id);
			return helper.getDetailsTemplate(Youtube.formatData(data, utils), data, embedUrl)
		} else {
			return helper.template(embedUrl, _this.options);
		}
	}

	async process() {
		try {
			if (!utils.ifInline(this.options, this.service)) {
				this.output = await helper.inlineEmbed(this, Youtube.urlToText)
			} else {
				let match;
				while ((match = utils.matches(this.regex, this.input)) !== null) {
					if (this.options.served.indexOf(match[0]) !== -1) continue;
					let id       = match[1];
					let embedUrl = `https://www.youtube.com/embed/${id}`;
					let data, text;
					if (this.options.videoDetails) {
						data = await this.data(id);
						text = helper.getDetailsTemplate(Youtube.formatData(data, utils), data, embedUrl);
					} else {
						text = helper.template(embedUrl, this.options);
					}

					this.embeds.push({
						text : text,
						index: match.index
					})
				}
			}

		} catch (error) {
			console.log(error)
		}

		return [this.output, this.embeds];
	}
}

