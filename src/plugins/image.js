import extend from "just-extend"
import { insert } from "../utils/dom"

export default function(opts) {
	const defaultOptions = {
		regex: /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,
		template(args) {
			return `<img class="ejs-image" src="${args[1]}"/>`
		}
	}

	const { regex, template } = extend({}, defaultOptions, opts)
	return {
		transform(options) {
			return Promise.resolve(extend({}, options, insert(regex, template, options)))
		}
	}
}
