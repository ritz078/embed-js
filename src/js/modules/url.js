import { urlRegex, lastElement } from './utils'

export default class Url {
	constructor(input, options) {
		this.input    = input;
		this.options  = options;
		this.urlRegex = urlRegex();
	}

	process() {
		var config = this.options.linkOptions;
		return this.input.replace(this.urlRegex, (match)=> {
			let extension = lastElement(match.split('.'));
			if ((lastElement(match) === '/'))
				match = match.slice(0, -1);
			if (config.exclude.indexOf(extension) === -1)
				return this.options.template.url(match, this.options);
			return match;
		});
	}
}
