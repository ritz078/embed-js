import extend from 'just-extend'
import pWaterfall from 'p-waterfall'
import image from './plugins/image'
import url from './plugins/url'

function transformArray (plugins) {
	return plugins.map(p => p.transform)
}

class EmbedJS {
	constructor (options) {
		const defaultOptions = {
			plugins: [
				url(),
				image()
			],
			inlineEmbed: false,
			replaceText: false,
			_embeds: []
		}

		this.options = extend({}, defaultOptions, options)
	}

	process () {
		const {plugins} = this.options
		return pWaterfall(transformArray(plugins), this.options)
	}

	text (cb) {}

	render () {}
}

export default EmbedJS
