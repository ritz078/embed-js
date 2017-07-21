import test from 'ava'
import isPromise from 'p-is-promise'
import basic from '../src/plugins/basic'

const options = {
	result: 'Nunquam perdere #helloWorld olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

const pluginOptions = {
	regex: /(^|\s)#([a-z\d-]+)/gi,
	replace: true,
	template (args) {
		return `<a href="https://a.com/${args[2]}">${args[0]}</a>`
	}
}

test('Plugin: basic - should return a Promise when called', async (t) => {
	t.truthy(isPromise(basic(pluginOptions).transform(options)))
})

test('Plugin: basic - should return correct', async (t) => {
	const {result} = await basic(pluginOptions).transform(options)

	t.is(result, 'Nunquam perdere<a href="https://a.com/helloWorld"> #helloWorld</a> olla https://b.jpg.')
})
