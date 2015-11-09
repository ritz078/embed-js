const utils = require('../utils.es6');
let Base = require('../base.es6');

class Dailymotion extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi;
	}

	template(match){
		const dimensions = utils.dimensions(this.options);
		const id = match.split('/')[2];
		const template =
		`<div class="ejs-video ejs-embed">
		<iframe src="http://www.dailymotion.com/embed/video/${id}" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`
		return template;
	}
}

module.exports = Dailymotion;
