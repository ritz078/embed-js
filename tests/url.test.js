import {expect} from 'chai'
import url from '../src/plugins/url'
import isPromise from 'p-is-promise'

const {describe, it} = global;

describe('Plugin: url', () => {
	it('should return a function when called', () => {
		expect(isPromise(url().transform({
			input:'https://a.com'
		}))).to.equal(true)
	})

	it('should convert URL into anchor', (done) => {
		const x = url().transform({
			input:'https://a.com'
		})

		x.then(({input}) => {
			expect(input).to.equal('<a href="https://a.com">https://a.com</a>')
			done()
		});
	})

	it('should include attributes in URL', (done) => {
		const x = url({
			attributes: {
				target: "_blank"
			}
		}).transform({
			input: 'hello https://world.com'
		})

		x.then(({input}) => {
			expect(input).to.equal('hello <a href="https://world.com" target="_blank">https://world.com</a>')
			done()
		})
	})
})
