const utils = require('../utils.es6');
let Base    = require('../base.es6');

class Instagram extends Base{
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

module.exports = Instagram;
