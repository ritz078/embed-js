let Base = require('../base.es6');

class JsFiddle extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex =/jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
		this.service = 'jsfiddle';
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
