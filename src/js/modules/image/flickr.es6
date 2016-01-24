import { getDimensions } from '../utils.es6'
import Base from '../base.es6'
import regex from '../regex.es6'

export default class Flickr extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = regex.flickr;
		this.service = 'flickr'
	}

	template(match){
		let dimensions = getDimensions(this.options);
		return this.options.template.flickr(match, dimensions, this.options);
	}
}

