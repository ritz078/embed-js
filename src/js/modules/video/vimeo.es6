import { truncate, ifInline } from '../utils.es6'
import { getDetailsTemplate, template, inlineEmbed, normalEmbed } from './../helper.es6'
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

	static formatData(data, truncate) {
		return {
			title         : data.title,
			thumbnail     : data.thumbnail_medium,
			rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
			views         : data.stats_number_of_plays,
			likes         : data.stats_number_of_likes,
			description   : truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
			url           : data.url,
			id            : data.id,
			host          : 'vimeo'
		}
	}

	data(id) {
		let url = `https://vimeo.com/api/v2/video/${id}.json`;
		return new Promise((resolve) => {
			fetch(url)
				.then((data) => data.json())
				.then((json) => resolve(json[0]))
		})
	}

	static urlToText(_this, match, url, normalEmbed) {
		let id;
		if (!normalEmbed) {
			id = _this.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
		} else {
			id = match[3]
		}
		if (!id) return;
		let embedUrl = `https://player.vimeo.com/video/${id}`;
		if (_this.options.videoDetails) {
			return new Promise((resolve) => {
				_this.data(id).then((data) => resolve(getDetailsTemplate(Vimeo.formatData(data, truncate), data, embedUrl, _this.options)))
			})
		} else {
			return new Promise((resolve) => resolve(template(embedUrl, _this.options)))
		}

	}

	process() {
		return new Promise((resolve) => {
			if (!ifInline(this.options, this.service)) {
				inlineEmbed(this, Vimeo.urlToText).then((response) => {
					resolve([response, this.embeds])
				})
			} else {
				normalEmbed(this, Vimeo.urlToText).then((embeds) => {
					resolve([this.output, embeds])
				})
			}
		})

	}
}
