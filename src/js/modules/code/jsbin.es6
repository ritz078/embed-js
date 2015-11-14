let Base = require('../base.es6');

class JsBin extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
		this.service = 'jsbin';
	}

	template(id) {
		return `<div class="ejs-jsbin ejs-embed">
		<iframe height="${this.options.codeEmbedHeight}" class="jsbin-embed foo" src="http://${id}/embed?html,js,output"></iframe>
		</div>`
	}
}

module.exports = JsBin;
