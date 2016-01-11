import Base from '../base.es6'

export default class Basic extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex =/((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
		this.service = 'image'
	}

	template(match){
		return this.options.template.basicImage(match, this.options)
	}
}

