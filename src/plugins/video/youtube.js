import extend from "just-extend"
import truncate from "just-truncate"
import isDom from "is-dom"
import unfetch from "../../utils/fetch"
import basic from "../basic"

const name = 'youtube'

/**
 * Decorate data into a simpler structure
 * @param data
 * @returns {{title, thumbnail, rawDescription, views: *, likes: *, description: *, url: string, id, host: string}}
 */
function formatData({ snippet, statistics, id }) {
	return {
		title: snippet.title,
		thumbnail: snippet.thumbnails.medium.url,
		rawDescription: snippet.description,
		views: statistics.viewCount,
		likes: statistics.likeCount,
		description: snippet.description,
		url: `https://www.youtube.com/watch?v=${id}`,
		id: id,
		host: "youtube"
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
		return formatData(data.items[0])
	} catch (e) {
		return {}
	}
}

/**
 * Template with description and other details fetched from the API
 * @param data
 * @param embedUrl
 * @returns {string}
 */
function withDetailsTemplate(data, embedUrl) {
	return `
	<div class="ejs-preview ejs-embed">
		<div class="ejs-thumb ejs-video-thumb" data-ejs-url="${embedUrl}" style="background-image:url(${data.thumbnail})">
			<span class="ejs-play">&#9658;</span>
		</div>
		<div class="ejs-info">
			<h4 class="ejs-title">
				<a href="${data.url}">${data.title}</a>
			</h4>
			<div class="ejs-desc">${truncate(data.description, 150)}</div>
		</div>
	</div>`
}

/**
 * Template which directly emebeds the youtube video in an iframe
 * @param embedUrl
 * @param height
 * @returns {string}
 */
function withoutDetailsTemplate(embedUrl, height) {
	return `<iframe src="${embedUrl}" frameBorder="0" height="${height}"></iframe>`
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
	let classes = document.getElementsByClassName("ejs-video-thumb")
	for (let i = 0; i < classes.length; i++) {
		classes[i].onclick = function() {
			const url = this.getAttribute("data-ejs-url")
			onVideoShow(url)
			let autoPlayUrl = url + "?autoplay=true"
			this.parentNode.innerHTML = withoutDetailsTemplate(
				autoPlayUrl,
				height
			)
		}
	}
}

async function _process(args, options, { gAuthKey, details }) {
	const id = args[1]
	const embedUrl = `https://www.youtube.com/embed/${id}`
	let data
	if (details) {
		data = await fetchDetails(id, gAuthKey)
	}

	return { data, embedUrl }
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
		async template(args, options, { details, height }, {data, embedUrl}) {
			return details
				? withDetailsTemplate(data, embedUrl)
				: withoutDetailsTemplate(embedUrl, height)
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

youtube.pluginName = name

export default youtube
