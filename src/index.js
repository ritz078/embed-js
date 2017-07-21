import extend from 'just-extend'
import pWaterfall from 'p-waterfall'
import isDom from 'is-dom'
import image from './plugins/image'
import emoji from './plugins/emoji'
import url from './plugins/url'
import youtube from './plugins/youtube'
import { appendEmbedsAtEnd } from './utils/dom'

function transformArray (plugins) {
	return plugins.map(p => p.transform)
}

class EmbedJS {
	constructor (options) {
		const defaultOptions = {
			plugins: [
				url(),
				emoji(),
				image(),
				youtube({
					details: false
				})
			],
			inlineEmbed: true,
			replaceText: false,
			_embeds: []
		}

		let {input} = options
		if (!input) {
			throw new Error('You need to pass input element or string in the options object.')
		}

		if (isDom(options.input)) {
			input = options.input.innerHTML
			this.element = options.input
		}

		this.options = extend({}, defaultOptions, options, {
			input
		})
	}

	async process () {
		const options = this.resetOptions()
		const {plugins} = options
		this.resultText = await pWaterfall(transformArray(plugins), options)
		return this.resultText
	}

	resetOptions() {
		return extend({}, this.options, {
			_embeds: []
		})
	}

	async text () {
		return this.resultText || this.process()
	}

	load () {
		this.options.plugins.forEach(p => p.onLoad && p.onLoad(this.options))
	}

	async render () {
		if (!this.element) {
			throw new Error('You haven\'t passed the input as an element.')
		}
		const options = this.resultText || await this.process()
		const {inlineEmbed} = this.options

		this.element.innerHTML = inlineEmbed ? options.input : appendEmbedsAtEnd(options)
	}
}

export default EmbedJS
