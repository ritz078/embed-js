import {expect} from 'chai'
import emoji from '../src/plugins/emoji'
import isPromise from 'p-is-promise'

const {describe, it} = global;

describe('Plugin: emoji', () => {
	it('should return a Promise when called', () => {
		expect(isPromise(emoji().transform({
			input: ':ok: hello :+1:'
		}))).to.equal(true)
	})

	it('should convert URL into anchor', (done) => {
		const x = emoji().transform({
			input: ':ok: hello :+1:'
		})

		x.then(({input}) => {
			expect(input).to.equal('🆗 hello 👍');
			done()
		})
	})

	it('should not parse the URL', (done) => {
		const x = emoji().transform({
			input: ':ok: hello :+1: https://a.com:8071'
		})

		x.then(({input}) => {
			expect(input).to.equal('🆗 hello 👍 https://a.com:8071')
			done()
		})
	})
})
