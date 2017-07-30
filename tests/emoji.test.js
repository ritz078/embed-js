import test from 'ava'
import emoji from '../src/plugins/emoji/emoji'
import isPromise from 'p-is-promise'

test('Plugin: emoji - should return a Promise when called', (t) => {
	t.truthy(isPromise(emoji().transform({
		result: ':ok: hello :+1:',
		_services: []
	})))
})

test('Plugin: emoji - should convert URL into anchor', async (t) => {
	const {result} = await emoji().transform({
		result: ':ok: hello :+1:',
		_services: []
	})
	t.snapshot(result)
})

test('Plugin: emoji - should not parse the URL', async (t) => {
	const {result} = await emoji().transform({
		result: ':ok: hello :+1: https://a.com:8071',
		_services: []
	})

	t.snapshot(result)
})
