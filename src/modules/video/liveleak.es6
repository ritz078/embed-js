import utils from '../utils.es6';
import Base from '../base.es6';

class LiveLeak extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
	}

	template(match){
		var dimensions = utils.dimensions(this.options);
		let template =
		`<div class="ejs-video">
		<iframe src="http://www.liveleak.com/e/${match.split('=')[1]}" height="${dimensions.height}" width="${dimensions.width}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = LiveLeak;
