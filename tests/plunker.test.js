import chai, { expect } from 'chai'
import isPromise from 'p-is-promise'
import extend from 'just-extend'
import plunker from '../src/plugins/plunker'
import chaiHtml from 'chai-html'

chai.use(chaiHtml)

const {describe, it} = global

const options = {
	input: 'Nunquam perdere https://plnkr.co/edit/OiX7kC olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

describe('Plugin: plunker', () => {
	it('should return a Promise when called', () => {
		expect(isPromise(plunker().transform(options))).to.equal(true)
	})

	it('should return correct result when replaceUrl is false', (done) => {
		const x = plunker().transform(options)

		x.then(({input}) => {
			expect(input).html.to.equal('Nunquam perdere https://plnkr.co/edit/OiX7kC <div class="ejs-embed ejs-plunker"><iframe src="http://embed.plnkr.co/OiX7kC" height="300"></iframe></div> olla https://b.jpg.')
			done()
		})
	})

	it('should return correct result when replaceUrl is true', (done) => {
		const options2 = extend({}, options, {
			replaceUrl:true
		})

		const x = plunker().transform(options2)

		x.then(({input}) => {
			expect(input).html.to.equal('Nunquam perdere <div class="ejs-embed ejs-plunker"><iframe src="http://embed.plnkr.co/OiX7kC" height="300"></iframe></div> olla https://b.jpg.')
			done()
		})
	})
})
