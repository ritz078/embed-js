import { embed } from '../helpers'

class Base {
	constructor(input, output, embeds, options, regex, service) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.regex   = regex;
		this.service = service;
	}

	template(match){
		return this.options.template[this.service](match, this.options);
	}

	process() {
		return embed(this);
	}
}

export default Base
