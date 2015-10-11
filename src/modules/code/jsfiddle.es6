import utils from '../utils.es6';

class JsFiddle{
	constructor(input,options, embeds){
		this.input = input;
		this.options = options;
		this.embeds = embeds;
		this.regex =/jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
	}

	template(id){
		var template =
		`<div class="ejs-embed ejs-jsfiddle">
		<iframe height="${this.options.codeEmbedHeight}" src="http://${id}/embedded"></iframe>
		</div>`;
		return template;
	}

	process(){
		let match;
		while((match = utils.matches(this.regex, this.input)) !== null){
			let text = this.template(match[0]);
			this.embeds.push({
				text : text,
				index : match.index
			})
		}
		return this.embeds;
	}

}

module.exports = JsFiddle;
