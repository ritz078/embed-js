import snarkdown from "snarkdown"
import extend from "just-extend"

export default () => ({
	transform(options) {
		return Promise.resolve(
			extend({}, options, {
				input: snarkdown(options.input)
			})
		)
	}
})
