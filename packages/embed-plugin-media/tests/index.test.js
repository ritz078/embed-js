import test from "ava"
import extend from "just-extend"
import isPromise from "p-is-promise"
import media from "../src"

const options = {
  result: "Nunquam perdere https://a.jpg olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  _embeds: [],
  _services: []
}

test("Plugin: image - should return a Promise when called", t => {
  t.truthy(isPromise(media().transform(options)))
})

test("Plugin: image - should return the correct result", async t => {
  const { result } = await media().transform(options)

  t.snapshot(result)
})

test("Plugin: media - audio", async t => {
  const options2 = extend({}, options, {
    result: "Nunquam perdere https://a.mp3 olla https://b.mp3."
  })

  const { result } = await media().transform(options2)
  t.snapshot(result)
})

test("Plugin: media - video", async t => {
  const options2 = extend({}, options, {
    result: "Nunquam perdere https://a.mp4 olla https://b.mp3."
  })

  const { result } = await media().transform(options2)
  t.snapshot(result)
})
