import { ifInline } from './utils.es6'
import {inlineEmbed, normalEmbed} from './helper.es6'

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
		return this.options.template.github(data, options);
	}

	static async fetchRepo(data) {
		let api      = `https://api.github.com/repos/${data.user}/${data.repo}`;
		let response = await fetch(api);
		return await response.json();
	}

	static async urlToText(_this, match, url, normalEmbed){
		let data = !normalEmbed ? ({
			user : match[2],
			repo : match[3]
		}) : ({
			user : match[1],
			repo : match[2]
		});

		if (!data.repo) return;
		let response = await Github.fetchRepo(data);
		return Github.template(response, _this.options);
	}

	async process() {
		if (!ifInline(this.options, this.service)) {
			this.output = await inlineEmbed(this, Github.urlToText);
		} else {
			this.embeds = await normalEmbed(this, Github.urlToText)
		}

		return [this.output, this.embeds]
	}
}

