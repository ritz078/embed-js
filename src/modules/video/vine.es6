import Base from '../base.es6';

class Vine extends Base{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /vine.co\/v\/[a-zA-Z0-9]+/gi;
	}

	template(match){
		let config = this.options.vineOptions;

		let template =
		`<div class="ejs-vine">
		<iframe class="ejs-vine-iframe" src="https://vine.co/v/${match.split('/')[2]}/embed/${config.type}" height="${config.height}" width="${config.width}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = Vine;
