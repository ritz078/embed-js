import utils from './utils.es6'

export default class Github {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.service = 'github';
		this.regex   = /github.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/gi;
	}

	template(data) {
		return ejs.template.Github(data, this.options) || `<div class="ejs-embed ejs-github">
		<div class="ejs-ogp-thumb" style="background-image:url(${data.owner.avatar_url})"></div>
		<div class="ejs-ogp-details">
		<div class="ejs-ogp-title"><a href="${data.html_url}" target="${this.options.linkOptions.target}">${data.full_name}</a></div>
		<div class="ejs-ogb-details">${data.description}</div><div class="ejs-github-stats">
        <span>
        <i class="fa fa-star"></i>${data.stargazers_count}
        </span>
        <span>
        <i class="fa fa-code-fork"></i>${data.network_count}
        </span>
        </div></div></div>`
	}

	async fetchRepo(data) {
		let api      = `https://api.github.com/repos/${data.user}/${data.repo}`;
		let response = await fetch(api);
		return await response.json();
	}

	async process() {
		let match;
		if (!utils.ifInline(this.options, this.service)) {
			let regexInline = this.options.link ? new RegExp(`([^>]*${this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${this.regex.source})`, 'gi');
			while ((match = utils.matches(regexInline, this.output)) !== null) {
				let url = this.options.link ? match[0].slice(0, -4) : match[0];
				console.log(match);
				if (this.options.served.indexOf(url) == -1) {
					if (!match[3]) continue;   //if url doesn't have repo name then don't process it. User profiles are not supported.
					let data  = {
						user: match[2],
						repo: match[3]
					};
					let value = await this.fetchRepo(data);
					let text  = this.template(value);
					if (this.options.link) {
						this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text)
					} else {
						this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text)
					}
					this.options.served.push(url);
				}
			}
		} else {
			while (match = utils.matches(this.regex, this.input)) {
				let url = match[0];
				if (this.options.served.indexOf(url) == -1) {
					if (!match[3]) continue;   //if url doesn't have repo name then don't process it. User profiles are not supported.
					let data  = {
						user: match[2],
						repo: match[3]
					};
					let value = await this.fetchRepo(data);
					let text  = this.template(value);
					this.embeds.push({
						text : text,
						index: match.index
					})
				}
			}
		}

		return [this.output, this.embeds]
	}
}

