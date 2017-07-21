import test from 'ava'
import isPromise from 'p-is-promise'
import markdown from '../src/plugins/markdown'

const options = {
	result: 'Nunquam **perdere** #helloWorld olla https://b.jpg.',
}

test('Plugin: markdown - should return a promise', (t) => {
	t.truthy(isPromise(markdown().transform(options)))
})

test('Plugin: markdown - should return correct result', async (t) => {
	const {result} = await markdown().transform(options)
	const expected = 'Nunquam <strong>perdere</strong> #helloWorld olla https://b.jpg.'
	t.is(result, expected)
})
