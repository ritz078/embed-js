import test from "ava"
import extend from "just-extend"
import noembed from "../src"
import fetch from "isomorphic-unfetch"
import { isServicePresent } from "../src/noembed-regex"

const options = {
  replaceUrl: false,
  inlineEmbed: true,
  fetch,
  _embeds: [],
  _services: []
}

const text =
  "Nunquam perdere https://www.youtube.com/watch?v=DYsOIjw8Emg https://a.jpg olla https://b.jpg."

test("Plugin: noembed - youtube", async t => {
  const opts = extend({}, options, {
    result: text
  })

  const { result } = await noembed().transform(opts)
  t.snapshot(result)
})

test("noembed-regex : isServicePresent", t => {
  t.true(isServicePresent("youtube", text))
  t.false(isServicePresent("twitter", text))
})
