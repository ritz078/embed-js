import test from 'ava'
import emoji from '../src/plugins/emoji'
import isPromise from 'p-is-promise'

test('Plugin: emoji - should return a Promise when called', (t) => {
	t.truthy(isPromise(emoji().transform({
		result: ':ok: hello :+1:'
	})))
})

test('Plugin: emoji - should convert URL into anchor', async (t) => {
	const {result} = await emoji().transform({
		result: ':ok: hello :+1:'
	})
	t.is(result, '🆗 hello 👍')
})

test('Plugin: emoji - should not parse the URL', async (t) => {
	const {result} = await emoji().transform({
		result: ':ok: hello :+1: https://a.com:8071'
	})

	t.is(result, '🆗 hello 👍 https://a.com:8071')
})
