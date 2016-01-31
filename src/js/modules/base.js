import { embed } from './helper'

class Base {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
	}

	process() {
		return embed(this);
	}
}

export default Base
