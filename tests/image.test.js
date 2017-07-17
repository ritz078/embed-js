import { expect } from 'chai'
import isPromise from 'p-is-promise'
import image from '../src/plugins/image'

const {describe, it} = global

const options = {
	input: 'Nunquam perdere https://a.jpg olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

describe('Plugin: image', () => {
	it('should return a Promise when called', () => {
		expect(isPromise(image().transform(options))).to.equal(true)
	})

	it('should return the correct result', (done) => {
		const x = image().transform(options)

		x.then(({input}) => {
			const expected = 'Nunquam perdere https://a.jpg <img class="ejs-image" src="https://a.jpg"/> olla https://b.jpg <img class="ejs-image" src="https://b.jpg"/>.'
			expect(input).to.equal(expected)
			done()
		})
	})
})
