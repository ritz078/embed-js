import Video from './video.es6';

class Ustream extends Video{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ustream.tv\/[a-z\/0-9]*/gi;
	}

	template(match){
		let id = match.split('/');
		id.splice(1, 0, 'embed');
		let dimensions = this.dimensions();
		let template =
		`<div class="ejs-embed">
		<iframe src="//www.${id.join('/')}" height="${dimensions.height}" width="${dimensions.width}"></iframe>',
		'</div>'`;
		return template;
	}
}

module.exports = Ustream;
