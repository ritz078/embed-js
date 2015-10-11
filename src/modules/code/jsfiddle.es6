import Code from './code.es6';

class JsFiddle extends Code{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex =/jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
	}

	template(id){
		var template =
		`<div class="ejs-embed ejs-jsfiddle">
		<iframe height="${this.options.codeEmbedHeight}" src="http://${id}/embedded"></iframe>
		</div>`;
		return template;
	}
}

module.exports = JsFiddle;
