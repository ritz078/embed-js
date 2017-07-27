import EmbedJS from '../src'
import test from 'ava'
import url from '../src/plugins/url'
import emoji from '../src/plugins/emoji/emoji'
import image from '../src/plugins/image/image'

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

	const { result } = await ejs.process()
	t.is(result, '<a href="https://a.com">https://a.com</a> Cum ionicis <img class="ejs-image" src="https://image.jpg"/> tormento experimentum, 🆗 omnes fortises captis nobilis, alter menses.')
})
