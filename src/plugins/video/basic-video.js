import extend from 'just-extend'
import basic from '../basic'

const name = 'basicVideo'

export default function basicVideo(opts) {
	const defaultOptions = {
		name,
		regex: /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi,
		template(args) {
			return `<video src="${args[0]}" controls class="ejs-video"></video>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}

basicVideo.id = name
