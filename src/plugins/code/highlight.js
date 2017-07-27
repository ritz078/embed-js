import extend from 'just-extend'
import prism from 'prismjs'
import basic from '../basic'

export default function (opts) {
	const defaultOptions = {
		regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
		template(args) {
			const [, ,language, code] = args
			return `<pre><code class="language-${language || 'markup'}">${prism.highlight(code, prism.languages[language || 'markup'])}</code></pre>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_replaceAnyways: true,
		_ignoreAnchorCheck: true,
		_ignoreInlineCheck: true
	})
	return basic(pluginOptions)
}
