import unfetch from "isomorphic-unfetch"
import extend from 'just-extend'
import getRegex from '../utils/noembed-regex'
import getQuery from "../utils/getQuery"
import basic from './basic'

async function fetchData (url, {maxWidth, maxHeight, noWrap}) {
	try {
		const params = {
			url,
			maxwidth: maxWidth,
			maxheight: maxHeight,
			nowrap: 'no'
		}
		const res = await unfetch(`https://noembed.com/embed?${getQuery(params)}`)
		return await res.json()
	} catch (e) {
		return {
			html: ''
		}
	}
}

export default function (opts) {
	const defaultOptions = {
		regex: getRegex(),

		maxWidth: 300,

		maxHeight: 400,

		async template(args) {
			const { html } = await fetchData(args[0], pluginOptions)
			return `<div class="ejs-embed">${html}</div>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
