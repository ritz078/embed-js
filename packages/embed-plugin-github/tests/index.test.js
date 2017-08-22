import test from "ava"
import extend from "just-extend"
import isPromise from "p-is-promise"
import github from "../src"

const options = {
  result:
    "Nunquam perdere https://github.com/ritz078/embed.js https://a.jpg olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  fetch: require("isomorphic-unfetch"),
  _embeds: [],
  _services: []
}

test("Plugin: github - return a promise", t => {
  t.true(isPromise(github().transform(options)))
})

test("Plugin: github - returns correct result for single match", async t => {
  const { result } = await github().transform(options)
  t.snapshot(result)
})

test("Plugin: github - returns correct result for multiple matches", async t => {
  const opts = extend({}, options, {
    result:
      "Nunquam perdere https://github.com/ritz078/embed.js https://a.jpg olla https://b.jpg https://github.com/ritz078/starring."
  })

  const { result } = await github().transform(opts)
  t.snapshot(result)
})
