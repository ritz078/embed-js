import Base from '../base.es6'
import regex from '../regex.es6'

export default class Basic extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = regex.basicImage;
		this.service = 'image'
	}

	template(match){
		return this.options.template.basicImage(match, this.options)
	}
}

