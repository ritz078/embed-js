import test from 'ava'
import url from '../src/plugins/url'
import isPromise from 'p-is-promise'


	test('Plugin: url - should return a function when called', (t) => {
		t.truthy(isPromise(url().transform({
			input:'https://a.com'
		})))
	})

	test('Plugin: url - should convert URL into anchor', async (t) => {
		const {input} = await url().transform({
			input:'https://a.com'
		})

		t.is(input, '<a href="https://a.com">https://a.com</a>')
	})

	test('Plugin: url - should include attributes in URL', async (t) => {
		const {input} = await url({
			attributes: {
				target: "_blank"
			}
		}).transform({
			input: 'hello https://world.com'
		})

		t.is(input, 'hello <a href="https://world.com" target="_blank">https://world.com</a>')
	})
