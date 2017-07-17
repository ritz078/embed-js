import { expect } from 'chai'
import extend from 'just-extend'
import { insert, appendEmbedsAtEnd } from '../src/utils/dom'

const {describe, it} = global

const options = {
	input: 'Nunquam perdere https://a.jpg olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

const options2 = extend({}, options, {
	input: 'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a> olla <a href="https://b.jpg">https://b.jpg</a>.',
})

const template = (args) => {
	return `<img src="${args[1]}"/>`
}

const regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi

describe('Util: dom', () => {
	describe('inlineEmbed set to true', () => {
		it('should append to url when replaceUrl is false and URLs are without anchor', () => {
			const opts = extend({}, options)
			const expected = 'Nunquam perdere https://a.jpg <img src="https://a.jpg"/> olla https://b.jpg <img src="https://b.jpg"/>.'
			expect(insert(regex, template, opts).input).to.equal(expected)
		})

		it('should append to url when .inputreplaceUrl is false and URLs are with anchor', () => {
			const expected = 'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a><img src="https://a.jpg"/> olla <a href="https://b.jpg">https://b.jpg</a><img src="https://b.jpg"/>.'

			const opts = extend({}, options2)
			expect(insert(regex, template, opts).input).to.equal(expected)
		})

		it('should replace url when replaceUrl is true and URLs are without anchor', () => {
			const opts = extend({}, options, {
				replaceUrl: true
			})
			const expected = 'Nunquam perdere <img src="https://a.jpg"/> olla <img src="https://b.jpg"/>.'

			expect(insert(regex, template, opts).input).to.equal(expected)
		})

		it('should replace url when replaceUrl is true and URLs are with anchor', () => {
			const expected = 'Nunquam perdere <img src="https://a.jpg"/> olla <img src="https://b.jpg"/>.'
			const opts = extend({}, options2, {
				replaceUrl: true
			})

			expect(insert(regex, template, opts).input).to.equal(expected)
		})
	})

	describe('inlineEmbed set to false', () => {
		it('should add content at the end when URLs are without anchor tags', () => {
			const opts = extend({}, options, {
				inlineEmbed: false,
				_embeds:[]
			})

			const expected = 'Nunquam perdere https://a.jpg olla https://b.jpg. <img src="https://a.jpg"/> <img src="https://b.jpg"/>'
			const opts2 = insert(regex, template, opts)
			expect(appendEmbedsAtEnd(opts2)).to.equal(expected)
		})

		it('should add content at the end when URLs are with anchor tags', () => {
			const opts = extend({}, options2, {
				inlineEmbed: false,
				embeds: []
			})

			const expected = 'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a> olla <a href="https://b.jpg">https://b.jpg</a>. <img src="https://a.jpg"/> <img src="https://b.jpg"/>'
			const opts2 = insert(regex, template, opts)
			expect(appendEmbedsAtEnd(opts2)).to.equal(expected)
		})
	})
})
