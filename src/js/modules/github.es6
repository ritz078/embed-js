import utils from './utils.es6'
import helper from './helper.es6'

export default class Github {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.service = 'github';
		this.regex   = /github.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/gi;
	}

	static template(data, options) {
		return ejs.template.Github(data, options) || `<div class="ejs-embed ejs-github">
		<div class="ejs-ogp-thumb" style="background-image:url(${data.owner.avatar_url})"></div>
		<div class="ejs-ogp-details">
		<div class="ejs-ogp-title"><a href="${data.html_url}" target="${options.linkOptions.target}">${data.full_name}</a></div>
		<div class="ejs-ogb-details">${data.description}</div><div class="ejs-github-stats">
        <span>
        <i class="fa fa-star"></i>${data.stargazers_count}
        </span>
        <span>
        <i class="fa fa-code-fork"></i>${data.network_count}
        </span>
        </div></div></div>`
	}

	static async fetchRepo(data) {
		let api      = `https://api.github.com/repos/${data.user}/${data.repo}`;
		let response = await fetch(api);
		return await response.json();
	}

	static async urlToText(_this, match){
		let data = {
			user : match[2],
			repo : match[3]
		};
		if (!data.repo) return;
		let response = await Github.fetchRepo(data);
		return Github.template(response, _this.options);
	}

	async process() {
		if (!utils.ifInline(this.options, this.service)) {
			this.output = await helper.inlineEmbed(this, Github.urlToText);
		} else {
			let match;
			while (match = utils.matches(this.regex, this.input)) {
				let url = match[0];
				if (this.options.served.indexOf(url) == -1) {
					if (!match[3]) continue;   //if url doesn't have repo name then don't process it. User profiles are not supported.
					let data  = {
						user: match[2],
						repo: match[3]
					};
					let response = await Github.fetchRepo(data);
					let text  = Github.template(response, this.options);
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

