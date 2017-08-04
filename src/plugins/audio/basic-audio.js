import extend from "just-extend"
import base from "../base"

const name = 'basicAudio'

function basicAudio (opts) {
	const defaultOptions = {
		name,
		regex: /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi,
		template(args) {
			return `<audio src="${args[1]}" controls class="ejs-audio"></audio>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return base(pluginOptions)
}

basicAudio.id = name
export default basicAudio
