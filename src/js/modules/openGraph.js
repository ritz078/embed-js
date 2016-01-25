import { urlRegex, ifInline } from './utils'
import { inlineEmbed, normalEmbed } from './helper'

export default class OpenGraph {
	constructor(input, output, options, embeds) {
		this.input        = input;
		this.output       = output;
		this.options      = options;
		this.embeds       = embeds;
		this.service      = 'opengraph';
		this.regex        = urlRegex();
		this.excludeRegex = new RegExp(['.mp4|.mp3|.gif|.pdf|.doc|.ppt|.docx|.jpg|.jpeg|.ogg'].concat(options.openGraphExclude).join('|'), 'gi')
	}

	static ifProcessOGC(url, excludeRegex) {
		return url.match(excludeRegex) ? false : true
	}

	template(data) {
		return this.options.template.openGraph(data, this.options)
	}

	fetchData(url) {
		url     = encodeURIComponent(url);
		let api = new Function('url', 'return `' + this.options.openGraphEndpoint + '`')(url);
		return new Promise((resolve) => {
			fetch(api)
				.then((res)=>res.json())
				.then((json)=>resolve(this.options.onOpenGraphFetch(json) || json))
		})
	}

	static urlToText(_this, match, url) {
		if (!OpenGraph.ifProcessOGC(url, _this.excludeRegex)) return;

		return new Promise((resolve) => {
			_this.fetchData(url)
			.then((data) => resolve(data && data.success ? _this.template(data) : null))
		})
	}


	process() {
		return new Promise((resolve) => {
			if (!ifInline(this.options, this.service)) {
				inlineEmbed(this, OpenGraph.urlToText).then((output) => {
					resolve([output, this.embeds])
				})
			} else {
				normalEmbed(this, OpenGraph.urlToText).then((embeds) => {
					resolve([this.output, embeds])
				})
			}
		})


	}
}
