import utils from '../utils.es6';

import Highlight from './highlight.es6';
import Ideone    from './ideone.es6';
import Plunker   from './plunker.es6';
import JsBin     from './jsbin.es6';
import CodePen   from './codepen.es6';
import JsFiddle  from './jsfiddle.es6';

class Code {
	constructor(input, output, options, embeds) {
		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
	}

	process() {
		try {
			let output = this.output;
			let embeds = this.embeds;
			output = this.options.highlightCode ? (new Highlight(output, this.options).process()) : output;
			embeds = utils.ifEmbed(this.options, 'ideone') ? (new Ideone(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'plunker') ? (new Plunker(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'jsbin') ? (new JsBin(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'codepen') ? (new CodePen(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'jsfiddle') ? (new JsFiddle(this.input, this.options, embeds).process()) : embeds;

			return [output, embeds];
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Code;
