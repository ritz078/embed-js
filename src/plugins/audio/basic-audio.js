import extend from "just-extend"
import basic from "../basic"

export default function(opts) {
	const defaultOptions = {
		regex: /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi,
		template(args) {
			return `<audio src="${args[1]}" controls class="ejs-audio"></audio>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
