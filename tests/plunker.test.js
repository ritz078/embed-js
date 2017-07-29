import test from 'ava'
import isPromise from 'p-is-promise'
import extend from 'just-extend'
import plunker from '../src/plugins/code/plunker'

const options = {
	result: 'Nunquam perdere https://plnkr.co/edit/OiX7kC olla https://b.jpg.',
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: [],
	_services:[]
}

	test('Plugin: plunker - should return a Promise when called', (t) => {
		t.truthy(isPromise(plunker().transform(options)))
	})

	test('Plugin: plunker - should return correct result when replaceUrl is false', async (t) => {
		const {result} = await plunker().transform(options)

		t.is(result, 'Nunquam perdere https://plnkr.co/edit/OiX7kC <div class="ejs-embed ejs-plunker"><iframe src="http://embed.plnkr.co/OiX7kC" height="300"></iframe></div> olla https://b.jpg.')
	})

	test('Plugin: plunker - should return correct result when replaceUrl is true', async (t) => {
		const options2 = extend({}, options, {
			replaceUrl:true
		})

		const {result} = await plunker().transform(options2)
		t.is(result, 'Nunquam perdere <div class="ejs-embed ejs-plunker"><iframe src="http://embed.plnkr.co/OiX7kC" height="300"></iframe></div> olla https://b.jpg.')
	})
