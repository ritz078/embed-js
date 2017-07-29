import extend from "just-extend"
import unfetch from "../../utils/fetch"
import basic from "../basic"

const name = 'github'

async function _process(args) {
	const [, user, repo] = args

	try {
		const res = await unfetch(`https://api.github.com/repos/${user}/${repo}`)
		return res.json()
	} catch (e) {
		return {}
	}
}

export default function github(opts) {
	const defaultOptions = {
		name,
		regex: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+[^\.])/gi,

		async template(args, options, pluginOptions, data) {
			return `<div class="ejs-embed ejs-preview"><div class="ejs-thumb" style="background-image:url(${data.owner &&
				data.owner
					.avatar_url})"></div><div class="ejs-info"><div class="ejs-title"><a href="${data.html_url}" target="_blank">${data.full_name}</a></div><div class="ejs-desc">${data.description}</div></div></div>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_process
	})
	return basic(pluginOptions)
}

github.pluginName = name
