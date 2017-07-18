import extend from 'just-extend'
import {insert} from '../utils/dom'

export default ({regex, template}) => {
	if(!regex) {
		throw new ReferenceError('regex is not passed in options.')
	}
	if (!template) {
		throw new ReferenceError('template is not passed in options.')
	}
	return {
		transform(options) {
			return Promise.resolve(
				extend({}, options, insert(regex, template, options))
			)
		}
	}
}
