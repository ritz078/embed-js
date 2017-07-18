import chai, { expect } from 'chai'
import isPromise from 'p-is-promise'
import basic from '../src/plugins/basic'
import chaiHtml from 'chai-html'

chai.use(chaiHtml)

const {describe, it} = global

const options = {
	input: 'Nunquam perdere #helloWorld olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

const pluginOptions = {
	regex: /(^|\s)#([a-z\d-]+)/gi,
	replace: true,
	template (args) {
		return `<a href="https://a.com/${args[2]}">${args[0]}</a>`
	}
}

describe('Plugin: basic', () => {
	it('should return a Promise when called', () => {
		expect(isPromise(basic(pluginOptions).transform(options))).to.equal(true)
	})

	it('should return correct', (done) => {
		const x = basic(pluginOptions).transform(options)

		x.then(({input}) => {
			expect(input).html.to.equal('Nunquam perdere<a href="https://a.com/helloWorld"> #helloWorld</a> olla https://b.jpg.')
			done()
		})
	})
})
