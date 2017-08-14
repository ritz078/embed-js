import test from "ava"
import isPromise from "p-is-promise"
import emojiImage from "../src"

const options = {
  result: "Parmas mori! Heu, :home: primus barcas!",
  _services: []
}

test("Plugin: emoji - returns a promise", t => {
  t.true(isPromise(emojiImage().transform(options)))
})

test("Plugin: emoji - returns a span element with emoji class name", async t => {
  const { result } = await emojiImage().transform(options)

  t.snapshot(result)
})
