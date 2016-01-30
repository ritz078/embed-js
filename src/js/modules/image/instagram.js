import Base from '../base'
import regex from '../regex'

export default class Instagram extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = regex.instagram;
		this.service = 'instagram'
	}

	template(match){
		return this.options.template.instagram(match, this.options)
	}
}

