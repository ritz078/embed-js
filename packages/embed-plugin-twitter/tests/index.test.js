import test from "ava"
import twitter from "../src"

const options = {
	result:
		"Nunquam perdere https://twitter.com/threepointone/status/889495129865760768 https://a.jpg olla https://b.jpg.",
	replaceUrl: false,
	inlineEmbed: true,
	_embeds: [],
	_services: []
}

test("Plugin: twitter", async t => {
	const { result } = await twitter().transform(options)
	t.regex(result, /are you looking for speakers/)
})
