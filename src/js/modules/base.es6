import utils from './utils.es6'

class Base {
	constructor(input, output, options, embeds) {
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
	}

	process() {
		if (!utils.ifInline(this.options, this.service)) {
			let regexInline = this.options.link ? new RegExp(`([^>]*${this.regex.source})<\/a>`,'gm') : new RegExp(`([^\\s]*${this.regex.source})`,'gm');
			this.output = this.output.replace(regexInline, (match)=> {
				if(this.options.link){
					return !this.options.inlineText ? this.template(match.slice(0, -4)) + '</a>' : match + this.template(match.slice(0,-4))
				}else{
					return !this.options.inlineText ? this.template(match) : match + this.template(match)
				}

			})
		}
		else {
			let match;
			while ((match = utils.matches(this.regex, this.input)) !== null) {
				let text = this.template(match[0]);
				this.embeds.push({
					text : text,
					index: match.index
				})
			}
		}
		return [
			this.output,
			this.embeds
		];
	}
}

export default Base
