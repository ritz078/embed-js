import { getDimensions } from '../utils'
import Base from '../base'
import regex from '../regex'

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

