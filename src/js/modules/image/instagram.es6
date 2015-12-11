import utils from '../utils.es6'
import Base from '../base.es6'

export class Instagram extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = /instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi;
		this.service = 'instagram'
	}

	template(match){
		let dimensions = utils.dimensions(this.options);
		return ejs.template.instagram(match, dimensions, this.options) || `<div class="ejs-embed ejs-instagram"><iframe src="${utils.toUrl(match.split('/?')[0])}/embed/" height="${dimensions.height}"></iframe></div>`
	}
}

