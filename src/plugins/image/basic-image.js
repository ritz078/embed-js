import extend from "just-extend"
import base from "../base"

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
	return base(pluginOptions)
}

basicImage.id = name
