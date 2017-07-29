import test from 'ava'
import isPromise from 'p-is-promise'
import image from '../src/plugins/image/basic-image'

const options = {
	result: 'Nunquam perdere https://a.jpg olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: [],
	_services:[]
}

test('Plugin: image - should return a Promise when called', (t) => {
	t.truthy(isPromise(image().transform(options)))
})

test('Plugin: image - should return the correct result', async (t) => {
	const {result} = await image().transform(options)

	t.snapshot(result)
})
