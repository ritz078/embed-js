import { urlRegex } from './utils'
import { asyncEmbed } from '../helpers'
import 'whatwg-fetch'

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

	template(data) {
		return this.options.template.openGraph(data, this.options)
	}

	static fetchData(url, _) {
		url     = encodeURIComponent(url);
		let api = new Function('url', 'return `' + _.options.openGraphEndpoint + '`')(url);
		return new Promise((resolve) => {
			fetch(api)
				.then((res)=>res.json())
				.then((json)=>resolve(_.options.onOpenGraphFetch(json) || json))
		})
	}

	static urlToText(_, match, url) {
		if (url.match(_.excludeRegex)) return Promise.resolve();

		return new Promise((resolve) => {
			OpenGraph.fetchData(url, _).then((data) => resolve(data && data.success ? _.template(data) : ''))
		})
	}


	process() {
		return new Promise((resolve) => asyncEmbed(this, OpenGraph.urlToText).then((data) => resolve(data)))
	}
}
