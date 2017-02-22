import {truncate} from '../utils'
import {getDetailsTemplate, template, asyncEmbed} from '../../helpers'
import fetch from 'unfetch'
import regex from '../regex'


function formatData(data, truncate) {
	return {
		title         : data.title,
		thumbnail     : data.thumbnail_medium,
		rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
		views         : data.stats_number_of_plays,
		likes         : data.stats_number_of_likes,
		description   : truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
		url           : data.url,
		id            : data.id,
		host          : 'vimeo'
	}
}

function data(id) {
	let url = `https://vimeo.com/api/v2/video/${id}.json`;
	return new Promise((resolve) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => resolve(json[0]))
	})
}

function urlToText(args, match, url, normalEmbed) {
	let id;
	if (!normalEmbed) {
		id = args.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
	} else {
		id = match[3]
	}
	if (!id) return;
	let embedUrl = `https://player.vimeo.com/video/${id}`;
	if (args.options.videoDetails) {
		return new Promise((resolve) => {
			data(id).then((data) => resolve(getDetailsTemplate(formatData(data, truncate), data, embedUrl, args.options)))
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
		regex  : regex.vimeo,
		service: 'vimeo'
	};

	return new Promise((resolve) => asyncEmbed(args, urlToText).then((data) => resolve(data)))
}
