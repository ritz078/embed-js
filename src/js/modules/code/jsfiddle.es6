import Base from '../base.es6'
import regex from '../regex.es6'

export default class JsFiddle extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex   = regex.jsfiddle;
		this.service = 'jsfiddle';
	}

	template(id) {
		id = id[id.length - 1] == '/' ? id.slice(0, - 1) : id;
		id =  (id.indexOf('//') !== -1) ? id : `//${id}`;
		return this.options.template.jsFiddle(id, this.options)
	}
}

