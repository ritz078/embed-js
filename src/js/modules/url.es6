import { urlRegex } from './utils.es6'

export default class Url{
	constructor(input,options){
		this.input = input;
		this.options = options;
		this.urlRegex =  urlRegex();
	}

	process(){
		var config = this.options.linkOptions;
		return this.input.replace(this.urlRegex,(match)=>{
			let extension = match.split('.')[match.split('.').length - 1];
			match = ((match[match.length-1] == '/') ? match.slice(0, -1) : match);
			console.log(this);
			if(config.exclude.indexOf(extension) === -1) return this.options.template.url(match, this.options)
			return match;
		});
	}
}
