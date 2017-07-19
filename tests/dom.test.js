import test from 'ava'
import extend from 'just-extend'
import { insert, appendEmbedsAtEnd } from '../src/utils/dom'

const options = {
	input: 'Nunquam perdere https://a.jpg olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: []
}

const pluginOptions = {
	replace: false
}

const options2 = extend({}, options, {
	input: 'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a> olla <a href="https://b.jpg">https://b.jpg</a>.',
})

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const template = async (args) => {
	return `<img src="${args[1]}"/>`
}

const regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi

test('Util: dom - inlineEmbed: true ,should append to url when replaceUrl is false and URLs are without anchor', async (t) => {
	const opts = extend({}, options)
	const expected = 'Nunquam perdere https://a.jpg <img src="https://a.jpg"/> olla https://b.jpg <img src="https://b.jpg"/>.'
	const {input} = await insert(regex, template, opts, pluginOptions)
	t.is(input, expected)
})

test('Util: dom - inlineEmbed: true, should append to url when replaceUrl is false and URLs are with anchor', async (t) => {
	const expected = 'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a><img src="https://a.jpg"/> olla <a href="https://b.jpg">https://b.jpg</a><img src="https://b.jpg"/>.'

	const opts = extend({}, options2)

	const { input } = await insert(regex, template, opts, pluginOptions)
	t.is(input, expected)
})

test('Util: dom - inlineEmbed: true, should replace url when replaceUrl is true and URLs are without anchor', async (t) => {
	const opts = extend({}, options, {
		replaceUrl: true
	})
	const expected = 'Nunquam perdere <img src="https://a.jpg"/> olla <img src="https://b.jpg"/>.'
	const {input} = await insert(regex, template, opts, pluginOptions)
	t.is(input, expected)
})

test('Util: dom - inlineEmbed: true, should replace url when replaceUrl is true and URLs are with anchor', async (t) => {
	const expected = 'Nunquam perdere <img src="https://a.jpg"/> olla <img src="https://b.jpg"/>.'
	const opts = extend({}, options2, {
		replaceUrl: true
	})

	const {input} = await insert(regex, template, opts, pluginOptions)
	t.is(input, expected)
})

test('Util: dom - inlineEmbed: false, should add content at the end when URLs are without anchor tags', async (t) => {
	const opts = extend({}, options, {
		inlineEmbed: false,
		_embeds: []
	})

	const expected = 'Nunquam perdere https://a.jpg olla https://b.jpg. <img src="https://a.jpg"/> <img src="https://b.jpg"/>'
	const opts2 = await insert(regex, template, opts)
	t.is(appendEmbedsAtEnd(opts2), expected)
})

test('Util: dom - inlineEmbed: false, should add content at the end when URLs are with anchor tags', async (t) => {
	const opts = extend({}, options2, {
		inlineEmbed: false,
		embeds: []
	})

	const expected = 'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a> olla <a href="https://b.jpg">https://b.jpg</a>. <img src="https://a.jpg"/> <img src="https://b.jpg"/>'
	const opts2 = await insert(regex, template, opts)
	t.is(appendEmbedsAtEnd(opts2), expected)
})
