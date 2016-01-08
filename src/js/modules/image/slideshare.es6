import utils                   from '../utils.es6'
import '../../vendor/fetch.js'
import { inlineEmbed, normalEmbed }                  from './../helper.es6'
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

	static async fetchData(_this, url) {
		const dimensions = utils.dimensions(_this.options);
		let api          = `http://www.slideshare.net/api/oembed/2?url=${url}&format=jsonp&maxwidth=${dimensions.width}&maxheight=${dimensions.height}`;
		let response     = await fetchJsonp(api, {
			credentials: 'include'
		});
		let data         = await response.json();
		return data.html;
	}

	template(html) {
		return ejs.template.slideShare(html, this.options) || `<div class="ejs-embed ejs-slideshare">${html}</div>`;
	}

	static async urlToText(_this, match, url) {
		let html = await SlideShare.fetchData(_this, url);
		return _this.template(html);
	}

	async process() {
		if (!utils.ifInline(this.options, this.service)) {
			this.output = await inlineEmbed(this, SlideShare.urlToText);
		} else {
			this.embeds = await normalEmbed(this, SlideShare.urlToText);
		}
		return [this.output, this.embeds]
	}
}
