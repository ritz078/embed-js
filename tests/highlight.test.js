import test from 'ava'
import highlight from '../src/plugins/code/highlight'

const options = {
	result: `
Vae, byssus!A falsis, urbs teres palus.
\`\`\`javascript
const x = "hello"
\`\`\`
Demolitione, exsul, et homo.
`,
	_services:[]
}

test("Plugin: Highlight - Embed code", async (t) => {
	const { result } = await highlight().transform(options)

	const expected = `
Vae, byssus!A falsis, urbs teres palus.
<pre><code class="language-javascript"><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token string">"hello"</span></code></pre>
Demolitione, exsul, et homo.
`

	t.is(result, expected)
})
