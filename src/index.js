import extend from 'just-extend'
import pWaterfall from 'p-waterfall'
import image from './plugins/image'
import url from './plugins/url'
import youtube from './plugins/youtube'

function transformArray (plugins) {
	return plugins.map(p => p.transform)
}

class EmbedJS {
	constructor (options) {
		const defaultOptions = {
			plugins: [
				// url(),
				// image(),
				youtube()
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

	text (cb) {
		this.process().then(({input}) => cb(input))
	}

	load () {
		this.options.plugins.forEach(p => p.onLoad && p.onLoad(this.options))
	}

	render () {}
}

export default EmbedJS
