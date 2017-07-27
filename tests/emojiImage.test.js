import test from 'ava'
import isPromise from 'p-is-promise'
import emojiImage from '../src/plugins/emojiImage'

const options = {
	result: 'Parmas mori! Heu, :home: primus barcas!'
}

test('Plugin: emojiImage - returns a promise', t => {
	t.true(isPromise(emojiImage().transform(options)))
})


test('Plugin: emojiImage - returns a span element with emoji class name', async (t) => {
	const {result} = await emojiImage().transform(options)

	t.is(result, 'Parmas mori! Heu, <span class="ejs-emoji-image ec ec-home"></span> primus barcas!')
})
