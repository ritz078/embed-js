import test from 'ava'
import isPromise from 'p-is-promise'
import audio from '../src/plugins/audio/audio'

const options = {
	result: 'Nunquam perdere https://a.mp3 olla https://b.mp3.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

test('Plugin: image - should return a Promise when called', (t) => {
	t.truthy(isPromise(audio().transform(options)))
})

test('Plugin: image - should return the correct result', async (t) => {
	const {result} = await audio().transform(options)
	const expected = 'Nunquam perdere https://a.mp3 <audio src="https://a.mp3" controls class="video-js ejs-video-js"></audio> olla https://b.mp3 <audio src="https://b.mp3" controls class="video-js ejs-video-js"></audio>.'

	t.is(result, expected)
})
