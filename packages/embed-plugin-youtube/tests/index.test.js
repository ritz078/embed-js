import test from "ava"
import isPromise from "p-is-promise"
import fetch from "isomorphic-unfetch"
import youtube from "../src"

const options = {
  result:
    "Nunquam perdere https://www.youtube.com/watch?v=QGZjVCHBXgs https://a.jpg olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  fetch,
  _embeds: [],
  _services: []
}

const pluginOptions = {
  gAuthKey: "AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts"
}

test("Plugin: youtube - should return a Promise when called", t => {
  t.truthy(isPromise(youtube(pluginOptions).transform(options)))
})

test("Plugin: youtube - details set to true", async t => {
  const { result } = await youtube(pluginOptions).transform(options)

  t.snapshot(result)
})

test("Plugin: youtube - details set to false", async t => {
  const { result } = await youtube({
    details: false,
    gAuthKey: pluginOptions.gAuthKey
  }).transform(options)

  t.snapshot(result)
})
