import test from 'ava'
import extend from 'just-extend'
import noembed from '../src/plugins/noembed'



const options = {
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

test('Plugin: noembed - youtube', async (t) => {
	const opts = extend({}, options, {
		result: 'Nunquam perdere https://www.youtube.com/watch?v=DYsOIjw8Emg https://a.jpg olla https://b.jpg.'
	})

	const {result} = await noembed().transform(opts)

	t.regex(result, /https:\/\/www.youtube.com\/embed\/DYsOIjw8Emg\?feature=oembed/)
})
