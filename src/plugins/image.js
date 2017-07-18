import extend from "just-extend"
import basic from './basic'

export default function(opts) {
	const defaultOptions = {
		regex: /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,
		template(args) {
			return `<img class="ejs-image" src="${args[1]}"/>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
