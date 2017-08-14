import test from "ava"
import fetch from "isomorphic-unfetch"
import twitter from "../src"

const options = {
  result:
    "Nunquam perdere https://twitter.com/threepointone/status/889495129865760768 https://a.jpg olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  fetch,
  _embeds: [],
  _services: []
}

test("Plugin: twitter", async t => {
  const { result } = await twitter().transform(options)
  t.snapshot(result)
})
