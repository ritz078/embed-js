import extend from "just-extend"
import unfetch from "../utils/fetch"
import basic from "./basic"

const name = 'slideShare'

async function _process(args) {
	const url = args[0]
	try {
		const res = await unfetch(`https://noembed.com/embed?url=${url}`)
		return await res.json()
	} catch (e) {
		return {
			html: url
		}
	}
}

export default function slideShare(opts) {
	const defaultOptions = {
		name,
		regex: /https?:\/\/www\.slideshare\.net\/.*\/.[^\s]*/gi,

		template(args, options, pluginOptions, { html }) {
			return `<div class="ejs-embed ejs-slideshare">${html}</div>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, { _process })
	return basic(pluginOptions)
}

slideShare.pluginName = name
