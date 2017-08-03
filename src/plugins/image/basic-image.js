import extend from "just-extend"
import basic from "../basic"

const name = 'basicImage'

export default function basicImage(opts) {
	const defaultOptions = {
		name,
		regex: /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,
		template(args) {
			return `<img class="ejs-embed" src="${args[1]}"/>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}

basicImage.id = name
