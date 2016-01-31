import Base from '../base'
import regex from '../regex'
import { lastElement } from '../utils'

export default class Ted extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex   = regex.ted;
		this.service = 'ted'
	}

	template(match) {
		const id = lastElement(match.split('/'));
		return this.options.template.ted(id, this.options)
	}
}
