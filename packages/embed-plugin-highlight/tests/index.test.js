import test from "ava"
import prismjs from "prismjs"
import highlight from "../src"

const options = {
  result: `
Vae, byssus!A falsis, urbs teres palus.
\`\`\`javascript
const x = "hello"
\`\`\`
Demolitione, exsul, et homo.
`,
  _services: []
}

test("Plugin: Highlight - Embed code", async t => {
  const { result } = await highlight({
    prismjs
  }).transform(options)

  t.snapshot(result)
})
