import utils from '../utils.es6';

class Plunker{
	constructor(input, options, embeds){
		this.input = input;
		this.options = options;
		this.embeds = embeds;
		this.regex =  /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
	}

	template(id){
		let template =
		`<div class="ejs-embed ejs-plunker">
            <iframe class="ne-plunker" src="http://embed.plnkr.co/${id}" height="${this.options.codeEmbedHeight}"></iframe>
        </div>`;
        return template;
	}

	process(){
		let match;
		while((match = utils.matches(this.regex, this.input)) !== null){
			let id = (match[0].indexOf('?') === -1) ? (match[0].split('/')[2]) : (match[0].split('/')[2].split('?')[0]);
			let text = this.template(id);
			this.embeds.push({
				text  : text,
				index : match.index
			})
		}
		return this.embeds;
	}
}

module.exports = Plunker;
