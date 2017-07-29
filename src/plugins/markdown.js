import snarkdown from "snarkdown"
import extend from "just-extend"

const name = 'markdown'

export default function markdown() {
	return {
		transform (options) {
			return Promise.resolve(
				extend({}, options, {
					result: snarkdown(options.result)
				})
			)
		}
	}
}

markdown.pluginName = name
