import { getDimensions , ifInline } from '../utils.es6'
import '../../vendor/fetch.js'
import { inlineEmbed, normalEmbed } from './../helper.es6'
import fetchJsonp              from '../../vendor/fetch_jsonp.js'

export default class SlideShare {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = /slideshare.net\/[a-zA-Z0-9_-]*\/[a-zA-Z0-9_-]*/gi;
		this.service = 'slideshare';
	}

	static fetchData(_this, url) {
		const dimensions = getDimensions(_this.options);
		let api          = `http://www.slideshare.net/api/oembed/2?url=${url}&format=jsonp&maxwidth=${dimensions.width}&maxheight=${dimensions.height}`;
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
		return new Promise((resolve) => {
			if (!ifInline(this.options, this.service)) {
				inlineEmbed(this, SlideShare.urlToText).then((response) => {
					resolve([response, this.embeds])
				})
			} else {
				normalEmbed(this, SlideShare.urlToText).then((embeds) => {
					resolve([this.output, embeds])
				})
			}
		})
	}
}
