import extend from 'just-extend'
import pWaterfall from 'p-waterfall'
import isDom from 'is-dom'
import { appendEmbedsAtEnd } from './utils/dom'
import all from './presets/all'

function transformArray (plugins) {
	return plugins.map(p => p.transform)
}
export default class EmbedJS {
	constructor (options) {
		const defaultOptions = {
			plugins: [
				...all({
					gAuthKey: "AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts"
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

		this.inputString = options.input
		if (isDom(options.input)) {
			this.inputString = options.input.innerHTML
		}

		this.options = extend({}, defaultOptions, options, {
			result: this.inputString
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
		return this.process()
	}

	load () {
		this.options.plugins.forEach(p => p.onLoad && p.onLoad(this.options))
	}

	async render () {
		const { input, target } = this.options
		if (!isDom(input) && !(target && isDom(target))) {
			throw new Error('You haven\'t passed the input as an element.')
		}

		const options = await this.process()
		const {inlineEmbed} = this.options

		const element = target || input
		element.innerHTML = inlineEmbed ? options.result : appendEmbedsAtEnd(options)
		this.load()
		return options
	}
}
