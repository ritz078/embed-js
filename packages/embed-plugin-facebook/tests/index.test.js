import test from "ava"
import facebook from "../src"

const options = {
  result:
    "Nunquam perdere https://www.facebook.com/ritz078/posts/1446988562057075 https://a.jpg olla https://b.jpg.",
  replaceUrl: false,
  inlineEmbed: true,
  _embeds: [],
  _services: []
}

test("facebook", async t => {
  const { result } = await facebook().transform(options)
  t.snapshot(result)
})
