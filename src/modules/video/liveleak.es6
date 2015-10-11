import Video from './video.es6';

class LiveLeak extends Video{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
	}

	template(match){
		var dimensions = this.dimensions();
		let template =
		`<div class="ejs-video">
		<iframe src="http://www.liveleak.com/e/${match.split('=')[1]}" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = LiveLeak;
