import extend from "just-extend"
import linkify from "html-linkify"

export default opts => {
	const defaultOptions = {
		attributes: {},

		// setting this to true will mess up characters like "
		escape: false
	}

	const { attributes, escape } = extend({}, defaultOptions, opts)
	return {
		async transform(options) {
			return extend({}, options, {
				result: linkify(options.result, { attributes, escape })
			})
		}
	}
}
