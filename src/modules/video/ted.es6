import Video from './video.es6';

class Ted extends Video{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
	}

	template(id){
		let dimensions = this.dimensions();
		var template =
		`<div class="ejs-embed">
			<iframe src="http://embed.ted.com/talks/${id.split('/')[2]}.html" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = Ted;
