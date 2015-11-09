let Base = require('../base.es6');

class Basic extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex =/((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
	}

	template(match){
		let template =
		`<div class="ejs-image ejs-embed">
		<div class="ne-image-wrapper">
		<img src="${match}"/>
		</div>
		</div>`;
		return template;
	}
}

module.exports = Basic;
