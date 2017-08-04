import extend from 'just-extend'
import isServer from 'is-server'
import base from './base'

const name = 'highlight'

export default function highlight(opts) {
	const defaultOptions = {
		name,
		regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
		prismjs: isServer() ? require('prismjs') : window.Prism,
		template(args, options, { prismjs }) {
			const language = args[2]
			const code = args[3]
			const className = `language-${language || 'markup'}`
			return `<pre class="${className}"><code class="${className}">${prismjs.highlight(code, prismjs.languages[language || 'markup'])}</code></pre>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_replaceAnyways: true,
		_ignoreAnchorCheck: true,
		_ignoreInlineCheck: true
	})
	return base(pluginOptions)
}

highlight.id = name
