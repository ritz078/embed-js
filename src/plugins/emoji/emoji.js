import extend from 'just-extend'
import emojiRegex from "regex-emoji"
import kebab from 'just-kebab-case'

// You need emoji.css to run with this plugin. Else you need to pass the
// template suitable to your needs.
export default function (opts) {
	const defaultOptions = {
		template(emojiName) {
			return `<span class="ejs-emoji-image ec ec-${kebab(emojiName)}"></span>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts)
	return {
		transform(options) {
			return Promise.resolve(
				extend({}, options, {
					result: options.result.replace(
						emojiRegex(),
						(match, emojiName) => pluginOptions.template(emojiName, options, pluginOptions)
					)
				})
			)
		}
	}
}
