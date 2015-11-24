import utils from '../utils.es6'
import Base from '../base.es6'

export class Instagram extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds)
		this.regex = /instagram.com\/p\/[a-zA-Z0-9]+/gi
		this.service = 'instagram'
	}

	template(match){
		let dimensions = utils.dimensions(this.options)
		return `<div class="ejs-embed"><iframe src="${utils.toUrl(match)}/embed/" width="${dimensions.width}" height="${dimensions.height}"></iframe></div>`
	}
}

