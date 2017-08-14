import test from "ava"
import isPromise from "p-is-promise"
import instagram from "../src"

const options = {
  result:
    "Nunquam perdere https://www.instagram.com/p/BVzwRqQlUdV/?taken-by=riteshkumar078 olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  _embeds: [],
  _services: []
}

test("Plugin: instagram - should return a Promise when called", t => {
  t.truthy(isPromise(instagram().transform(options)))
})

test("Plugin: instagram - should return the correct result", async t => {
  const { result } = await instagram().transform(options)

  t.snapshot(result)
})
