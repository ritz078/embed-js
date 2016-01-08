import { urlRegex, ifInline, matches } from './utils.es6'
import {inlineEmbed} from './helper.es6'

export default class OpenGraph {
	constructor(input, output, options, embeds) {
		this.input        = input;
		this.output       = output;
		this.options      = options;
		this.embeds       = embeds;
		this.service      = 'opengraph';
		this.excludeRegex = new RegExp(['.mp4|.mp3|.gif|.pdf|.doc|.ppt|.docx|.jpg|.jpeg|.ogg'].concat(options.openGraphExclude).join('|'), 'gi')
	}

	static ifProcessOGC(url, excludeRegex) {
		return url.match(excludeRegex) ? false : true
	}

	template(data) {
		return ejs.template.openGraph(data, this.options) || `<div class="ejs-embed ejs-ogp">
		<div class="ejs-ogp-thumb" style="background-image:url(${data.image})"></div>
		<div class="ejs-ogp-details">
		<div class="ejs-ogp-title"><a href="${data.url}" target="${this.options.linkOptions.target}">${data.title}</a></div>
		<div class="ejs-ogb-details">${data.description}</div></div></div>`
	}

	async fetchData(url) {
		try {
			url          = encodeURIComponent(url);
			let api      = new Function('url', 'return `' + this.options.openGraphEndpoint + '`')(url);
			let response = await fetch(api);
			let data     = await response.json();
			return this.options.onOpenGraphFetch(data) || data
		} catch (e) {
			this.options.onOpenGraphFail(e);
		}
	}

	static async urlToText(_this, match, url) {
		if (!OpenGraph.ifProcessOGC(url, _this.excludeRegex)) return;
		let data = await _this.fetchData(url);
		return data && data.success ? _this.template(data) : null;
	}


	async process() {
		try {
			let match;
			this.regex = urlRegex();
			if (!ifInline(this.options, this.service)) {
				this.output = await inlineEmbed(this, OpenGraph.urlToText)

			} else {
				while ((match = matches(this.regex, this.input)) !== null) {
					let url = match[0];
					if (!OpenGraph.ifProcessOGC(url, this.excludeRegex)) continue;
					let data = await this.fetchData(url);
					if (data && data.success) {
						let template = this.template(data);
						this.embeds.push({
							text : template,
							index: match.index
						});
						this.options.served.push(url);
					}
				}
			}
			return [this.output, this.embeds]
		} catch (e) {
			console.log(e)
		}

	}
}
