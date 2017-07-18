import extend from 'just-extend'
import basic from './basic'

export default (opts) => {
	const defaultOptions = {
		regex: /https?:\/\/plnkr.co\/edit\/([a-zA-Z0-9\?=]+)/gi,
		template(args) {
			return `<div class="ejs-embed ejs-plunker"><iframe src="http://embed.plnkr.co/${args[1]}" height="300"></iframe></div>`
		}
	}
	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
