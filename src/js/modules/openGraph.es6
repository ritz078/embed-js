import utils from './utils.es6'

export default class OpenGraph {
	constructor(input, output, options, embeds) {
		this.input        = input;
		this.output       = output;
		this.options      = options;
		this.embeds       = embeds;
		this.service      = 'opengraph';
		this.excludeRegex = new RegExp(['youtube', 'twitter', 'vimeo', 'unsplash', 'soundcloud', 'spotify', 'instagram','flickr'].concat(options.openGraphExclude).join('|'), 'gi')
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
			let response = await fetch(api, {
				credentials: 'no-cors'
			});
			let data     = await response.json();
			return this.options.onOpenGraphFetch(data) || data
		} catch (e) {
			this.options.onOpenGraphFail(e);

		}
	}

	async process() {
		try {
			let match;
			this.regex = utils.urlRegex();
			if (!utils.ifInline(this.options, this.service)) {
				let regexInline = this.options.link ? new RegExp(`([^>]*${this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${this.regex.source})`, 'gi');
				while ((match = utils.matches(regexInline, this.output)) !== null) {
					let url = this.options.link ? match[0].slice(0, -4) : match[0];
					if (!OpenGraph.ifProcessOGC(url, this.excludeRegex)) continue;
					let data = await this.fetchData(url);
					if (data && data.success) {
						let text = this.template(data);
						if (this.options.link) {
							this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text)
						} else {
							this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text)
						}
						this.options.served.push(url);
					}
				}

			} else {
				while ((match = utils.matches(this.regex, this.input)) !== null) {
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
