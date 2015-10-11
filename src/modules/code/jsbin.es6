import utils from '../utils.es6';

class JsBin {
	constructor(input, options, embeds) {
		this.input = input;
		this.options = options;
		this.embeds = embeds;
		this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
	}

	template(id) {
		let template =
		`<div class="ejs-jsbin ejs-embed">
		<iframe height="${this.options.codeEmbedHeight}" class="jsbin-embed foo" src="http://${id}/embed?html,js,output"></iframe>',
		</div>`;
		return template;
	}

	process(){
		let match;
		while((match = utils.matches(this.regex, this.input)) !== null){
			let text = this.template(match[0]);
			this.embeds.push({
				text  : text,
				index : match.index
			})
		}
		return this.embeds
	}
}

module.exports = JsBin;
