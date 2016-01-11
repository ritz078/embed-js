import { getDimensions } from '../utils.es6'
import Base from '../base.es6'

export default class Instagram extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi;
		this.service = 'instagram'
	}

	template(match){
		let dimensions = getDimensions(this.options);
		return this.options.template.instagram(match, dimensions, this.options)
	}
}

