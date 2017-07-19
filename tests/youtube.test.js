import test from 'ava'
import isPromise from 'p-is-promise'
import youtube from '../src/plugins/youtube'

const options = {
	input: 'Nunquam perdere https://www.youtube.com/watch?v=QGZjVCHBXgs https://a.jpg olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

test('Plugin: image - should return a Promise when called', (t) => {
	t.truthy(isPromise(youtube().transform(options)))
})

test('Plugin: image - should return the correct result', async (t) => {
	const {input} = await youtube().transform(options)
	const expected = 'Nunquam perdere https://www.youtube.com/watch?v=QGZjVCHBXgs <div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="https://www.youtube.com/embed/QGZjVCHBXgs"><div class="ejs-thumb" style="background-image:url(https://i.ytimg.com/vi/QGZjVCHBXgs/mqdefault.jpg)"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="https://www.youtube.com/watch?v=QGZjVCHBXgs">Top 100 Ghazals | टॉप 100 ग़ज़ल्स | HD Songs | One Stop Jukebox</a></div><div class="ejs-video-desc">Enjoy Top 100 gazals like "Tumko Dekha", "Woh Kagaz Ki Kashti", "Chithi Na Koi Sandesh", "Aye Dil E Nadan", "Ek Pyaar Ka Nagma" and more from legen...</div></div></div></div> https://a.jpg olla https://b.jpg.'

	t.is(input, expected)
})
