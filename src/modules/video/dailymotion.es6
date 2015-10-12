import Base from '../base.es6';

class Dailymotion extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi;
	}

	template(match){
		let dimensions = this.dimensions();
		let id = match.split('/')[2];
		let template =
		`<div class="ejs-video">
		<iframe src="http://www.dailymotion.com/embed/video/${id}" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`
		return template;
	}
}

module.exports = Dailymotion;
