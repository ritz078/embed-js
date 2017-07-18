import extend from 'just-extend'
import basic from './basic'

export default (opts) => {
	const defaultOptions = {
		regex: /https?:\/\/plnkr.co\/edit\/([a-zA-Z0-9\?=]+)/gi,
		height: 300,
		template(args, options, pluginOptions) {
			return `<div class="ejs-embed ejs-plunker"><iframe src="http://embed.plnkr.co/${args[1]}" height="${pluginOptions.height}"></iframe></div>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
