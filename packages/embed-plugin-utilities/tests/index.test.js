import test from "ava"
import extend from "just-extend"
import { insert } from "../src"

const options = {
	result: "Nunquam perdere https://a.jpg olla https://b.jpg.",
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: [],
	_services: [],
	plugins: []
}

const pluginOptions = {
	regex: /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,
	replace: false,
	async template(args) {
		return `<img src="${args[1]}"/>`
	}
}

const options2 = extend({}, options, {
	result:
		'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a> olla <a href="https://b.jpg">https://b.jpg</a>.'
})

test("Util: dom - inlineEmbed: true ,should append to url when replaceUrl is false and URLs are without anchor", async t => {
	const opts = extend({}, options)
	const expected =
		'Nunquam perdere https://a.jpg <img src="https://a.jpg"/> olla https://b.jpg <img src="https://b.jpg"/>.'
	const { result } = await insert(opts, pluginOptions)
	t.is(result, expected)
})

test("Util: dom - inlineEmbed: true, should append to url when replaceUrl is false and URLs are with anchor", async t => {
	const expected =
		'Nunquam perdere <a href="https://a.jpg">https://a.jpg</a><img src="https://a.jpg"/> olla <a href="https://b.jpg">https://b.jpg</a><img src="https://b.jpg"/>.'

	const opts = extend({}, options2)

	const { result } = await insert(opts, pluginOptions)
	t.is(result, expected)
})

test("Util: dom - inlineEmbed: true, should replace url when replaceUrl is true and URLs are without anchor", async t => {
	const opts = extend({}, options, {
		replaceUrl: true
	})
	const expected =
		'Nunquam perdere <img src="https://a.jpg"/> olla <img src="https://b.jpg"/>.'
	const { result } = await insert(opts, pluginOptions)
	t.is(result, expected)
})

test("Util: dom - inlineEmbed: true, should replace url when replaceUrl is true and URLs are with anchor", async t => {
	const expected =
		'Nunquam perdere <img src="https://a.jpg"/> olla <img src="https://b.jpg"/>.'
	const opts = extend({}, options2, {
		replaceUrl: true
	})

	const { result } = await insert(opts, pluginOptions)
	t.is(result, expected)
})
