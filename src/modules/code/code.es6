import utils from '../utils.es6';

import Highlight from './highlight.es6';
import Ideone from './ideone.es6';

class Code {
    constructor(input, output, options, embeds) {
		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
    }

    async process() {
        try {
		let output = this.output;
		let embeds = this.embeds;
		output = this.options.highlightCode ? await (new Highlight(output, this.options).process()) : output;
		embeds = utils.ifEmbed(this.options, 'ideone') ? await (new Ideone(this.input, this.options, embeds).process()) : embeds;

            return {
                output: output,
                embeds: embeds
            };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Code;
