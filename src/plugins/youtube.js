import extend from "just-extend"
import truncate from "just-truncate"
import isDom from "is-dom"
// in umd build this resolves to unfetch
import unfetch from "isomorphic-unfetch"
import basic from "./basic"

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
		description: truncate(snippet.description, 150),
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
export async function fetchDetails(id, gAuthKey) {
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
	return `<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="${embedUrl}"><div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="${data.url}">${data.title}</a></div><div class="ejs-video-desc">${data.description}</div></div></div></div>`
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
			this.parentNode.parentNode.innerHTML = withoutDetailsTemplate(
				autoPlayUrl,
				height
			)
		}
	}
}

async function getTemplate(id, options, { gAuthKey, details, height }) {
	const embedUrl = `https://www.youtube.com/embed/${id}`
	let data
	if (details) {
		data = await fetchDetails(id, gAuthKey)
	}

	return details
		? withDetailsTemplate(data, embedUrl)
		: withoutDetailsTemplate(embedUrl, height)
}

export default opts => {
	const defaultOptions = {
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
		async template(args, options, pluginOptions) {
			const id = args[1]
			return getTemplate(id, options, pluginOptions)
		}
	}

	if (!opts.gAuthKey) {
		throw new Error("You need to pass google auth key.")
	}

	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
