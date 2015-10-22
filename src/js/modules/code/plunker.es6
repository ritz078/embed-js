import Base from '../base.es6';

class Plunker extends Base{
	constructor(input, options, embeds){
		super(input, options, embeds);
		this.regex =  /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
	}

	template(match){
		let id = (match.indexOf('?') === -1) ? (match.split('/')[2]) : (match.split('/')[2].split('?')[0]);
		let template =
		`<div class="ejs-embed ejs-plunker">
            <iframe class="ne-plunker" src="http://embed.plnkr.co/${id}" height="${this.options.codeEmbedHeight}"></iframe>
        </div>`;
        return template;
	}
}

module.exports = Plunker;
