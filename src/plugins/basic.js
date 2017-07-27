import extend from "just-extend"
import { insert } from "../utils/dom"

export default opts => {
	const defaultOptions = {
		_replaceAnyways: false,
		_ignoreAnchorCheck: false,
		_ignoreInlineCheck: false,
		onLoad() {}
	}

	const pluginOptions = extend({}, defaultOptions, opts)

	const { _onLoadInternal, onLoad, regex, template } = pluginOptions

	if (!regex) {
		throw new ReferenceError("regex is not passed in options.")
	}
	if (!template) {
		throw new ReferenceError("template is not passed in options.")
	}

	return {
		async transform(options) {
			return extend({}, options, await insert(options, pluginOptions))
		},

		onLoad(options) {
			if (_onLoadInternal) {
				_onLoadInternal(options, pluginOptions)
			}
			if (onLoad) {
				onLoad(options, pluginOptions)
			}
		}
	}
}
