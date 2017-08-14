import test from "ava"
import url from "../src"
import isPromise from "p-is-promise"

test("Plugin: url - should return a function when called", t => {
  t.truthy(
    isPromise(
      url().transform({
        result: "https://a.com"
      })
    )
  )
})

test("Plugin: url - should convert URL into anchor", async t => {
  const { result } = await url().transform({
    result: "https://a.com"
  })

  t.snapshot(result)
})

test("Plugin: url - should include attributes in URL", async t => {
  const { result } = await url({
    attributes: {
      target: "_blank"
    }
  }).transform({
    result: "hello https://world.com"
  })

  t.snapshot(result)
})
