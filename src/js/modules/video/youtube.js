import { truncate } from '../utils'
import { getDetailsTemplate, template, asyncEmbed } from '../../helpers'
import fetch from 'unfetch'
import regex from '../regex'

function formatData(data) {
	return {
		title         : data.snippet.title,
		thumbnail     : data.snippet.thumbnails.medium.url,
		rawDescription: data.snippet.description,
		views         : data.statistics.viewCount,
		likes         : data.statistics.likeCount,
		description   : truncate(data.snippet.description, 150),
		url           : `https://www.youtube.com/watch?v=${data.id}`,
		id            : data.id,
		host          : 'youtube'
	}
}

function data(id, options) {
	let url      = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${options.googleAuthKey}&part=snippet,statistics`;
	return new Promise((resolve) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => resolve(json.items[0]))
	})
}

function urlToText(args, match, url, normalEmbed) {
	let id       = normalEmbed ? match[1] : match[2];
	let embedUrl = `https://www.youtube.com/embed/${id}`;
	if (args.options.videoDetails) {
		return new Promise((resolve) => {
			data(id, args.options).then((data) => resolve(getDetailsTemplate(formatData(data), data, embedUrl, args.options)))
		})
	} else {
		return new Promise((resolve) => resolve(template(embedUrl, args.options)))
	}
}

export default function (input, output, options, embeds) {
	const args = {
		input,
		output,
		options,
		embeds,
		regex  : regex.youtube,
		service: 'youtube'
	};

	return new Promise((resolve) => asyncEmbed(args, urlToText).then((data) => resolve(data)))
}
