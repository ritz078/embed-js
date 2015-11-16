import utils from '../utils.es6'

import Highlight from './highlight.es6'
import Ideone    from './ideone.es6'
import Plunker   from './plunker.es6'
import JsBin     from './jsbin.es6'
import CodePen   from './codepen.es6'
import JsFiddle  from './jsfiddle.es6'
import Gist      from './gist.es6'

class Code {
	constructor(input, output, options, embeds) {
		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
	}

	process() {
		try {
			let [input, output, options, embeds] = [this.input, this.output, this.options, this.embeds];

			output = options.highlightCode && !options.marked && HIGHLIGHTCODE ? (new Highlight(output, options).process()) : output;
			[output,embeds] = utils.ifEmbed(options, 'ideone') && IDEONE ? (new Ideone(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'plunker') && PLUNKER ? (new Plunker(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'jsbin') && JSBIN ? (new JsBin(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'codepen') && CODEPEN ? (new CodePen(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'jsfiddle') && JSFIDDLE ? (new JsFiddle(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'gist') && GIST ? (new Gist(input,output, options,embeds).process()) : [output,embeds];

			return [output, embeds];
		} catch (error) {
			console.log(error);
		}
	}
}

export default Code;
