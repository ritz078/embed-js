import extend from 'just-extend'
import isBrowser from 'is-in-browser'
import basic from '../basic'

const name = 'highlight'

export default function highlight(opts) {
	const defaultOptions = {
		name,
		regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
		prismjs: isBrowser ? window.Prism : require('prismjs'),
		template(args, options, { prismjs }) {
			const [, ,language, code] = args
			return `<pre class="language-${language || 'markup'}"><code class="language-${language || 'markup'}">${prismjs.highlight(code, prismjs.languages[language || 'markup'])}</code></pre>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_replaceAnyways: true,
		_ignoreAnchorCheck: true,
		_ignoreInlineCheck: true
	})
	return basic(pluginOptions)
}

highlight.pluginName = name
