import test from 'ava'
import isPromise from 'p-is-promise'
import audio from '../src/plugins/audio/basic-audio'

const options = {
	result: 'Nunquam perdere https://a.mp3 olla https://b.mp3.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: [],
	_services:[]
}

test('Plugin: image - should return a Promise when called', (t) => {
	t.truthy(isPromise(audio().transform(options)))
})

test('Plugin: image - should return the correct result', async (t) => {
	const {result} = await audio().transform(options)

	t.snapshot(result)
})
