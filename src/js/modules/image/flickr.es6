import utils from '../utils.es6';

import Base from '../base.es6';

class Flickr extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d]+\/[\d]+/gi;
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
