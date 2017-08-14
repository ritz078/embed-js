import test from "ava"
import isPromise from "p-is-promise"
import extend from "just-extend"
import { spy } from "sinon"
import base from "../src"

const options = {
  result: "Nunquam perdere #helloWorld olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  _embeds: [],
  _services: []
}

const pluginOptions = {
  regex: /(^|\s)#([a-z\d-]+)/gi,
  _replaceAnyways: true,
  _ignoreAnchorCheck: false,
  _ignoreInlineCheck: false,
  template(args) {
    return `<a href="https://a.com/${args[2]}">${args[0]}</a>`
  }
}

test("Plugin: basic - should return a Promise when called", async t => {
  t.truthy(isPromise(base(pluginOptions).transform(options)))
})

test("Plugin: basic - should return correct", async t => {
  const { result } = await base(pluginOptions).transform(options)

  t.snapshot(result)
})

test("Plugin: basic - execute onLoad when load is called", t => {
  const onLoad = spy()
  const _onLoadInternal = spy()
  const pluginOpts = extend({}, pluginOptions, { onLoad, _onLoadInternal })

  base(pluginOpts).onLoad(options)
  t.true(onLoad.calledWithExactly(options, pluginOpts))
  t.true(_onLoadInternal.calledWithExactly(options, pluginOpts))
})

test("Plugin: basic - should throw if regex or template is not passed", t => {
  t.throws(
    () =>
      base({
        regex: /a/gi
      }),
    Error
  )
  t.throws(
    () =>
      base({
        template() {}
      }),
    Error
  )
})
