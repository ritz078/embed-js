const utils = require('../utils.es6');
let Base = require('../base.es6');

class Ted extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
	}

	template(id){
		const dimensions = utils.dimensions(this.options);
		const template =
		`<div class="ejs-embed">
			<iframe src="http://embed.ted.com/talks/${id.split('/')[2]}.html" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = Ted;
