import extend from "just-extend"
import truncate from "just-truncate"
import isBrowser from "is-in-browser"
import basic from "./basic"

let unfetch
if (isBrowser) {
	unfetch = require("unfetch")
} else {
	unfetch = require("node-fetch")
}

function formatData(data) {
	return {
		title: data.snippet.title,
		thumbnail: data.snippet.thumbnails.medium.url,
		rawDescription: data.snippet.description,
		views: data.statistics.viewCount,
		likes: data.statistics.likeCount,
		description: truncate(data.snippet.description, 150),
		url: `https://www.youtube.com/watch?v=${data.id}`,
		id: data.id,
		host: "youtube"
	}
}

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

export default opts => {
	const defaultOptions = {
		regex: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi,
		gAuthKey: "AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts",
		details: true,
		height: 300,
		async template(args, options, { gAuthKey, details, height }) {
			const id = args[1]
			const embedUrl = `https://www.youtube.com/embed/${id}`
			if (details) {
				const data = await fetchDetails(id, gAuthKey)
				return `<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="${embedUrl}"><div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="${data.url}">${data.title}</a></div><div class="ejs-video-desc">${data.description}</div></div></div></div>`
			} else {
				return `<iframe src="${embedUrl}" frameBorder="0" height="${height}"></iframe>`
			}
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
