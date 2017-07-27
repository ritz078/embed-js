import unfetch from "isomorphic-unfetch"
import extend from "just-extend"
import getRegex from "../utils/noembed-regex"
import getQuery from "../utils/getQuery"
import basic from "./basic"

/**
 * Fetches the data from the noembed API
 * @param url
 * @param args
 * @param options
 * @param maxWidth
 * @param maxHeight
 * @returns {Promise.<*>}
 */
export async function _process(args, options, { maxWidth, maxHeight }) {
	const url = args[0]
	try {
		const params = {
			url,
			maxwidth: maxWidth,
			maxheight: maxHeight,
			nowrap: "no"
		}
		const res = await unfetch(`https://noembed.com/embed?${getQuery(params)}`)
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

		// max width of the embedded iframes.
		maxWidth: 300,

		// max height of the embedded iframes.
		maxHeight: 400,

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
