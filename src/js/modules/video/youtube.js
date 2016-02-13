import { truncate } from '../utils'
import { getDetailsTemplate, template, asyncEmbed } from '../../helpers'
import 'whatwg-fetch'
import regex from '../regex'

export default class Youtube {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex.youtube;
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

	data(id) {
		let url      = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${this.options.googleAuthKey}&part=snippet,statistics`;
		return new Promise((resolve) => {
			fetch(url)
			.then((data) => data.json())
			.then((json) => resolve(json.items[0]))
		})
	}

	static urlToText(_this, match, url, normalEmbed) {
		let id       = normalEmbed ? match[1] : match[2];
		let embedUrl = `https://www.youtube.com/embed/${id}`;
		if (_this.options.videoDetails) {
			return new Promise((resolve) => {
				_this.data(id).then((data) => resolve(getDetailsTemplate(Youtube.formatData(data, truncate), data, embedUrl, _this.options)))
			})
		} else {
			return new Promise((resolve) => resolve(template(embedUrl, _this.options)))
		}
	}

	process() {
		return new Promise((resolve) => asyncEmbed(this, Youtube.urlToText).then((data) => resolve(data)))
	}
}

