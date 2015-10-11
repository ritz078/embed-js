import utils from '../utils.es6';

class Ideone{
	constructor(input,options, embeds){
		this.input = input;
		this.options = options;
		this.embeds = embeds;
		this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
	}

	template(match){
		let template =
		`<div class="ejs-ideone ejs-embed">
			<iframe src="http://ideone.com/embed/${match.split('/')}" frameborder="0" height="${this.options.codeEmbedHeight}"></iframe>',
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

module.exports = Ideone;
