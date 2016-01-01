import utils from '../utils.es6'
import helper from './../helper.es6'
import '../../vendor/fetch.js'


export default class Vimeo {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;
		this.service = 'vimeo'
	}

	static formatData(data, utils) {
		return {
			title         : data.title,
			thumbnail     : data.thumbnail_medium,
			rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
			views         : data.stats_number_of_plays,
			likes         : data.stats_number_of_likes,
			description   : utils.truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
			url           : data.url,
			id            : data.id,
			host          : 'vimeo'
		}
	}

	async data(id) {
		try {
			let url      = `https://vimeo.com/api/v2/video/${id}.json`;
			let response = await fetch(url);
			let data     = await response.json();
			return data[0];
		} catch (error) {
			console.log(error);
		}

	}

	static async urlToText(_this, match){
		let id       = _this.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
		if (!id) return;
		let embedUrl = `https://player.vimeo.com/video/${id}`;
		let data;
		if (_this.options.videoDetails) {
			data = await _this.data(id);
			return helper.getDetailsTemplate(Vimeo.formatData(data, utils), data, embedUrl)
		} else {
			return helper.template(embedUrl, _this.options)
		}

	}

	async process() {
		try {
			if (!utils.ifInline(this.options, this.service)) {
				this.output = await helper.inlineEmbed(this, Vimeo.urlToText);
			} else {
				let match;
				while ((match = utils.matches(this.regex, this.input)) !== null) {
					if (this.options.served.indexOf(match[0]) !== -1) continue;
					let embedUrl = `https://player.vimeo.com/video/${match[3]}`;
					let data, text;
					if (this.options.videoDetails) {
						data = await this.data(match[3]);
						text = helper.getDetailsTemplate(Vimeo.formatData(data, utils), data, embedUrl)
					} else {
						text = helper.template(embedUrl, this.options);
					}

					this.embeds.push({
						text : text,
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

