import extend from "just-extend"
import isDom from "is-dom"
import unfetch from "../../utils/fetch"
import withDetailsTemplate from '../../utils/withDetailTemplate'
import withoutDetailsTemplate from '../../utils/withoutDetailTemplate'
import basic from "../basic"

const name = 'youtube'
const base = 'https://www.youtube.com/'


/**
 * Decorate data into a simpler structure
 * @param data
 * @returns {{title, thumbnail, rawDescription, views: *, likes: *, description: *, url: string, id, host: string}}
 */
function formatData({ snippet, id }) {
	return {
		title: snippet.title,
		thumbnail: snippet.thumbnails.medium.url,
		description: snippet.description,
		url: `${base}watch?v=${id}`,
		embedUrl: `${base}embed/${id}`
	}
}

/**
 * Fetch details of a particular youtube video
 * @param id
 * @param gAuthKey
 * @returns {Promise.<*>}
 */
async function fetchDetails(id, gAuthKey) {
	try {
		const res = await unfetch(
			`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${gAuthKey}&part=snippet,statistics`
		)
		const data = await res.json()
		return data.items[0]
	} catch (e) {
		return {}
	}
}

/**
 * Function executed when a content is rendered on the client site.
 * @param input
 * @param clickClass
 * @param onVideoShow
 * @param height
 */
function onLoad({ input }, { clickClass, onVideoShow, height }) {
	if (!isDom(input)) {
		throw new Error("input should be a DOM Element.")
	}
	let classes = document.getElementsByClassName(clickClass)
	for (let i = 0; i < classes.length; i++) {
		classes[i].onclick = function() {
			const url = this.getAttribute("data-ejs-url")
			onVideoShow(url)
			let autoPlayUrl = url + "?autoplay=true"
			this.parentNode.innerHTML = withoutDetailsTemplate(
				autoPlayUrl,
				height,
				name
			)
		}
	}
}

async function _process(args, options, { gAuthKey, details }) {
	const id = args[1]
	let data
	if (details) {
		data = await fetchDetails(id, gAuthKey)
	}

	return data
}

function youtube(opts) {
	const defaultOptions = {
		name,
		regex: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi,
		gAuthKey: "",
		details: true,
		height: 300,
		clickClass: "ejs-video-thumb",
		onVideoShow() {},
		_onLoadInternal(options, pluginOptions) {
			onLoad(options, pluginOptions)
		},
		onLoad() {},
		async template(args, options, { details, height, clickClass }, data) {
			const embedUrl = `${base}embed/${args[1]}`
			return details
				? withDetailsTemplate(formatData(data), clickClass)
				: withoutDetailsTemplate(embedUrl, height, name)
		}
	}

	if (!opts.gAuthKey) {
		throw new Error("You need to pass google auth key.")
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_process
	})
	return basic(pluginOptions)
}

youtube.id = name

export default youtube
