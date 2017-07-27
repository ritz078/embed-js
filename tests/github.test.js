import test from 'ava'
import extend from 'just-extend'
import isPromise from 'p-is-promise'
import github from '../src/plugins/github/github'

const options = {
	result: 'Nunquam perdere https://github.com/ritz078/embed.js https://a.jpg olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

test('Plugin: github - return a promise', t => {
	t.true(isPromise(github().transform(options)))
})

// test('Plugin: github - returns correct result for single match', async (t) => {
// 	const {result} = await github().transform(options)
// 	t.is(result, 'Nunquam perdere https://github.com/ritz078/embed.js  <div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(https://avatars3.githubusercontent.com/u/5389035?v=4)"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="https://github.com/ritz078/embed.js" target="_blank">ritz078/embed.js</a></div><div class="ejs-ogb-details">🌻  A JavaScript plugin that embeds emojis, media, maps, tweets, gists, code, services and markdown. ✨</div></div></div>https://a.jpg olla https://b.jpg.')
// })
//
// test('Plugin: github - returns correct result for multiple matches', async (t) => {
// 	const opts = extend({}, options, {
// 		result: 'Nunquam perdere https://github.com/ritz078/embed.js https://a.jpg olla https://b.jpg https://github.com/ritz078/starring.'
// 	})
//
// 	const {result} = await github().transform(opts)
// 	t.is(result, 'Nunquam perdere https://github.com/ritz078/embed.js  <div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(https://avatars3.githubusercontent.com/u/5389035?v=4)"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="https://github.com/ritz078/embed.js" target="_blank">ritz078/embed.js</a></div><div class="ejs-ogb-details">🌻  A JavaScript plugin that embeds emojis, media, maps, tweets, gists, code, services and markdown. ✨</div></div></div>https://a.jpg olla https://b.jpg https://github.com/ritz078/starring <div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(https://avatars3.githubusercontent.com/u/5389035?v=4)"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="https://github.com/ritz078/starring" target="_blank">ritz078/starring</a></div><div class="ejs-ogb-details">⭐️ Automatically star the npm-packages that you are using on GitHub.</div></div></div>.')
// })
