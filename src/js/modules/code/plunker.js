import Base from '../base'
import regex from '../regex'
import {lastElement} from '../utils'

export default class Plunker extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex   = regex.plunker;
		this.service = 'plunker'
	}

	template(match) {
		const a  = match.split('?')[0].split('/');  //TODO : make sure ? is excluded in regex.
		const id = lastElement(a);
		return this.options.template.plunker(id, this.options)
	}
}

