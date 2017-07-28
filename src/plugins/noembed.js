import unfetch from "../utils/fetch"
import extend from "just-extend"
import getRegex from "../utils/noembed-regex"
import basic from "./basic"

/**
 * Fetches the data from the noembed API
 * @param args
 * @returns {Promise.<*>}
 */
async function _process(args) {
	const url = args[0]
	try {
		const res = await unfetch(`https://noembed.com/embed?url=${url}`)
		return await res.json()
	} catch (e) {
		return {
			html: ""
		}
	}
}

export default function(opts = {}) {
	const defaultOptions = {
		// Regex to be used to identify noembed supported services.
		// By default it takes from noembed-regex.js
		regex: null,

		// In case you want to exclude a few services, you can do it here.
		// It accepts an array of service names in lowercase.
		excludeServices: [],

		async template(args, options, pluginOptions, { html }) {
			return `<div class="ejs-embed ejs-no-embed">${html}</div>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_process
	})

	if (!opts.regex) {
		pluginOptions.regex = getRegex(pluginOptions.excludeServices)
	}

	return basic(pluginOptions)
}
