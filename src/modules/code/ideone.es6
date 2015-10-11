import Code from './code.es6';

class Ideone extends Code{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
	}

	template(match){
		let template =
		`<div class="ejs-ideone ejs-embed">
			<iframe src="http://ideone.com/embed/${match.split('/')}" frameborder="0" height="${this.options.codeEmbedHeight}"></iframe>',
		</div>`;
		return template;
	}
}

module.exports = Ideone;
