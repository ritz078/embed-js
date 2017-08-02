import extend from "just-extend"
import unfetch from "../../utils/fetch"
import basic from "../basic"
import detailsTemplate from '../../utils/withDetailTemplate'

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

		async template(args, options, pluginOptions, { owner, description, html_url, full_name }) {
			return detailsTemplate({
				thumbnail: owner.avatar_url,
				url: html_url,
				description,
				title: full_name,
			})
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_process
	})
	return basic(pluginOptions)
}

github.pluginName = name
