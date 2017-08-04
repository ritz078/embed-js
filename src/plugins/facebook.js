import extend from "just-extend"
import base from "./base"
import withoutDetailTemplate from "../utils/without-detail-template"

const name = "facebook"

export default function facebook(opts) {
	const defaultOptions = {
		name,
		regex: /(https?:\/\/)?www\.facebook\.com\/(?:(videos|posts)\.php\?v=\d+|.*?\/(videos|posts)\/\d+\/?)/gi,
		height: 225,
		template(args, options, { height }) {
			const url = args[0]
			const type = url.indexOf("/videos/") < 0 ? "post" : "video"
			return withoutDetailTemplate(
				`https://www.facebook.com/plugins/${type}.php?href=${url}`,
				height,
				name
			)
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts)
	return base(pluginOptions)
}

facebook.id = name
