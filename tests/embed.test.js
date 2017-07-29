import EmbedJS from '../src'
import test from 'ava'
import url from '../src/plugins/url'
import emoji from '../src/plugins/emoji/emoji'
import image from '../src/plugins/image/basic-image'

test('EmbedJS - should ', async (t) => {
	const ejs = new EmbedJS({
		input: 'https://a.com Cum ionicis https://image.jpg tormento experimentum, :ok: omnes fortises captis nobilis, alter menses.',
		plugins: [
			url(),
			emoji(),
			image()
		],
		inlineEmbed: true,
		replaceUrl: true
	})

	const { result } = await ejs._process()
	t.snapshot(result)
})
