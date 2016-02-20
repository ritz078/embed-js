import { asyncEmbed } from '../../helpers'
import fetchJsonp     from 'fetch-jsonp'
import regex from '../regex'

export default class SlideShare {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex.slideShare;
		this.service = 'slideshare';
	}

	static fetchData(_this, url) {
		let api          = `http://www.slideshare.net/api/oembed/2?url=${url}&format=jsonp&maxwidth=${_this.options.videoWidth}&maxheight=${_this.options.videoHeight}`;
		return new Promise((resolve) => {
			fetchJsonp(api, {credentials: 'include'})
				.then((data) => data.json())
				.then((json) => resolve(json.html))
		})
	}

	template(html) {
		return this.options.template.slideShare(html, this.options)
	}

	static urlToText(_this, match, url) {
		return new Promise((resolve) => {
			SlideShare.fetchData(_this, url).then((html) => resolve(_this.template(html)))
		})
	}

	process() {
		return new Promise((resolve) => asyncEmbed(this, SlideShare.urlToText).then((data) => resolve(data)))
	}
}
