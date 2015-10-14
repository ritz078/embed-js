import utils from '../utils.es6';
import Base from '../base.es6';

class Ted extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
	}

	template(id){
		let dimensions = utils.dimensions(this.options);
		var template =
		`<div class="ejs-embed">
			<iframe src="http://embed.ted.com/talks/${id.split('/')[2]}.html" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = Ted;
