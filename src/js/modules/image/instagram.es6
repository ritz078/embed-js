import { getDimensions } from '../utils.es6'
import Base from '../base.es6'
import regex from '../regex.es6'

export default class Instagram extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = regex.instagram;
		this.service = 'instagram'
	}

	template(match){
		let dimensions = getDimensions(this.options);
		return this.options.template.instagram(match, dimensions, this.options)
	}
}

