const utils = require('../utils.es6');

let Base = require('../base.es6');

class Flickr extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d]+\/[\d]+/gi;
		this.service = 'flickr'
	}

	template(match){
		let dimensions = utils.dimensions(this.options);
		let template =
		`<div class="ejs-embed">
			<div class="ne-image-wrapper">
				<iframe src="${utils.toUrl(match)}/player/" width="${dimensions.width}" height="${dimensions.height}"></iframe>
			</div>
		</div>`;
		return template;
	}
}

module.exports = Flickr;
