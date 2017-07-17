import EmbedJS from '../src'
import {expect} from 'chai'
import url from '../src/plugins/url'
import emoji from '../src/plugins/emoji'
import image from '../src/plugins/image'

const {describe, it} = global

describe('EmbedJS', () => {
	it('should ', (done) => {
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

		ejs.process().then(({input}) => {
			expect(input).to.equal(
				'<a href="https://a.com">https://a.com</a> Cum ionicis <img class="ejs-image" src="https://image.jpg"/> tormento experimentum, 🆗 omnes fortises captis nobilis, alter menses.'
			)
			done()
		})
	})
})
