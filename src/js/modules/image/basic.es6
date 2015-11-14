let Base = require('../base.es6');

class Basic extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex =/((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
		this.service = 'image'
	}

	template(match){
		return `<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="${match}"/></div></div>`
	}
}

module.exports = Basic;
