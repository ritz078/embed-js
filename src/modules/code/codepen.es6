import utils from '../utils.es6';

class CodePen{
	constructor(input,options, embeds){
		this.input = input;
		this.options = options;
		this.embeds = embeds;
		this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
	}

	template(id){
		let template =
		`<div class="ejs-embed ejs-codepen">
		<iframe scrolling="no" height="${this.options.codeEmbedHeight}" src="${id.replace(/\/pen\//, '/embed/')}/?height=${this.options.codeEmbedHeight}"></iframe>'
		</div>`;
		return template;
	}

	process(){
		let match;
		while((match = utils.matches(this.regex, this.input)) !== null){
			let text = this.template(match[0]);
			this.embeds.push({
				text:text,
				index:match.index
			})
		}
		return this.embeds;
	}
}

module.exports = CodePen;
