import test from 'ava'
import isPromise from 'p-is-promise'
import extend from 'just-extend'
import { spy } from 'sinon'
import basic from '../src/plugins/basic'

const options = {
	result: 'Nunquam perdere #helloWorld olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

const pluginOptions = {
	regex: /(^|\s)#([a-z\d-]+)/gi,
	_replaceAnyways: true,
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

test('Plugin: basic - execute onLoad when load is called', (t) => {
	const onLoad = spy()
	const _onLoadInternal = spy()
	const pluginOpts = extend({}, pluginOptions, {onLoad, _onLoadInternal})

	basic(pluginOpts).onLoad(options)
	t.true(onLoad.calledWithExactly(options, pluginOpts))
	t.true(_onLoadInternal.calledWithExactly(options, pluginOpts))
})

test('Plugin: basic - should throw if regex or template is not passed', t => {
	t.throws(() => basic({
		regex: /a/gi
	}), ReferenceError)
	t.throws(() => basic({
		template() {}
	}), ReferenceError)
})
