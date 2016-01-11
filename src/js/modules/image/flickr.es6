import { getDimensions } from '../utils.es6'
import Base from '../base.es6'

export default class Flickr extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/gi;
		this.service = 'flickr'
	}

	template(match){
		let dimensions = getDimensions(this.options);
		return this.options.template.flickr(match, dimensions, this.options);
	}
}

