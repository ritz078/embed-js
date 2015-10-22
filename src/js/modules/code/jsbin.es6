import Base from '../base.es6';

class JsBin extends Base{
	constructor(input, options, embeds) {
		super(input, options, embeds);
		this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
	}

	template(id) {
		let template =
		`<div class="ejs-jsbin ejs-embed">
		<iframe height="${this.options.codeEmbedHeight}" class="jsbin-embed foo" src="http://${id}/embed?html,js,output"></iframe>',
		</div>`;
		return template;
	}
}

module.exports = JsBin;
