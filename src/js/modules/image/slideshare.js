import {asyncEmbed} from '../../helpers'
import fetchJsonp     from 'fetch-jsonp'
import regex from '../regex'

function fetchData(args, url) {
	let api = `http://www.slideshare.net/api/oembed/2?url=${url}&format=jsonp&maxwidth=${args.options.videoWidth}&maxheight=${args.options.videoHeight}`;
	return new Promise((resolve) => {
		fetchJsonp(api, {credentials: 'include'})
			.then((data) => data.json())
			.then((json) => resolve(json.html))
	})
}

function urlToText(args, match, url) {
	return new Promise((resolve) => {
		fetchData(args, url).then((html) => resolve(args.template(html)))
	})
}

export default function (input, output, options, embeds) {
	const args = {
		input, output, options, embeds,
		regex: regex.slideShare,
		service: 'slideshare',
		template(html) {
			return this.options.template.slideShare(html, this.options)
		}
	};

	return new Promise((resolve) => asyncEmbed(args, urlToText).then((data) => resolve(data)))
}
