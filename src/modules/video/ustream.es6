import utils from '../utils.es6';
import Base from '../base.es6';

class Ustream extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ustream.tv\/[a-z\/0-9]*/gi;
	}

	template(match){
		let id = match.split('/');
		id.splice(1, 0, 'embed');
		let dimensions = utils.dimensions(this.options);
		let template =
		`<div class="ejs-embed">
		<iframe src="//www.${id.join('/')}" height="${dimensions.height}" width="${dimensions.width}"></iframe>',
		'</div>'`;
		return template;
	}
}

module.exports = Ustream;
