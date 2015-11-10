const utils = require('../utils.es6');

if(build.HIGHLIGHTCODE) var Highlight = require('./highlight.es6');
if(build.IDEONE)        var Ideone    = require('./ideone.es6');
if(build.PLUNKER)       var Plunker   = require('./plunker.es6');
if(build.JSBIN)         var JsBin     = require('./jsbin.es6');
if(build.CODEPEN)       var CodePen   = require('./codepen.es6');
if(build.JSFIDDLE)      var JsFiddle  = require('./jsfiddle.es6');
if(build.GIST)          var Gist      = require('./gist.es6');

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

			output = options.highlightCode && !options.marked && build.HIGHLIGHTCODE ? (new Highlight(output, options).process()) : output;
			[output,embeds] = utils.ifEmbed(options, 'ideone') && build.IDEONE ? (new Ideone(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'plunker') && build.PLUNKER ? (new Plunker(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'jsbin') && build.JSBIN ? (new JsBin(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'codepen') && build.CODEPEN ? (new CodePen(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'jsfiddle') && build.JSFIDDLE ? (new JsFiddle(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'gist') && build.GIST ? (new Gist(input,output, options,embeds).process()) : [output,embeds];

			return [output, embeds];
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Code;
