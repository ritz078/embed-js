import Base from '../base'
import regex from '../regex'
import {lastElement} from '../utils'

export default class JsFiddle extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex   = regex.jsfiddle;
		this.service = 'jsfiddle';
	}

	template(id) {
		id = lastElement(id) == '/' ? id.slice(0, - 1) : id;
		id =  (id.indexOf('//') !== -1) ? id : `//${id}`;
		return this.options.template.jsFiddle(id, this.options)
	}
}

