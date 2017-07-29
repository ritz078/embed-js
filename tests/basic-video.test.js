import test from 'ava'
import isPromise from 'p-is-promise'
import video from '../src/plugins/video/basic-video'

const options = {
	result: 'Nunquam perdere https://a.mp4 olla https://b.mp4.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: [],
	_services:[]
}

test('Plugin: video - should return a Promise when called', (t) => {
	t.truthy(isPromise(video().transform(options)))
})

test('Plugin: video - should return the correct result', async (t) => {
	const {result} = await video().transform(options)
	const expected = 'Nunquam perdere https://a.mp4 <video src="https://a.mp4" controls class="ejs-video"></video> olla https://b.mp4 <video src="https://b.mp4" controls class="ejs-video"></video>.'

	t.is(result, expected)
})
