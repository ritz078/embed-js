import extend from "just-extend"
import unfetch from "../../utils/fetch"
import basic from "../basic"

async function _process(args) {
	const [, user, repo] = args

	try {
		const res = await unfetch(`https://api.github.com/repos/${user}/${repo}`)
		return res.json()
	} catch (e) {
		return {}
	}
}

export default function(opts) {
	const defaultOptions = {
		regex: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+[^\.])/gi,

		async template(args, options, pluginOptions, data) {
			return `<div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(${data.owner &&
				data.owner
					.avatar_url})"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="${data.html_url}" target="_blank">${data.full_name}</a></div><div class="ejs-ogb-details">${data.description}</div></div></div>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_process
	})
	return basic(pluginOptions)
}
