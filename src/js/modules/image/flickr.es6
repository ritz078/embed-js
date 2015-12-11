import utils from '../utils.es6'
import Base from '../base.es6'

export class Flickr extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/gi;
		this.service = 'flickr'
	}

	template(match){
		let dimensions = utils.dimensions(this.options);
		return ejs.template.flickr(match, dimensions, this.options) || `<div class="ejs-embed">
			<div class="ne-image-wrapper">
				<iframe src="${utils.toUrl(match.split('/?')[0])}/player/" width="${dimensions.width}" height="${dimensions.height}"></iframe>
			</div>
		</div>`
	}
}

