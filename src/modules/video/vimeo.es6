import utils from '../utils.es6';
import helper from './helper.es6';


class Vimeo {
	constructor(input, options, embeds) {
		this.input   = input;
		this.options = options;
		this.embeds  = embeds;

		this.regex   = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;
	}

	formatData(data) {
		return {
			title          : data.title,
			thumbnail      : data.thumbnail_medium,
			rawDescription : data.description.replace(/\n/g,'<br/>').replace(/&#10;/g, '<br/>'),
			views          : data.stats_number_of_plays,
			likes          : data.stats_number_of_likes,
			description    : utils.truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
			url            : data.url,
			id             : data.id,
			host           : 'vimeo'
		}
	}

	async data(id) {
		try {
			let url = `https://vimeo.com/api/v2/video/${id}.json`;
			let response = await fetch(url);
			let data = await response.json();
			return data[0];
		} catch (error) {
			console.log(error);
		}

	}

	async process() {
		try {
			let match;
			while ((match = utils.matches(this.regex, this.input)) !== null) {
				let data = await this.data(match[3]);
				let embedUrl = `https://player.vimeo.com/video/${match[3]}`
				let text = helper.detailsTemplate(this.formatData(data), embedUrl);
				this.embeds.push({
					text: text,
					index: match.index
				})
			}
			return this.embeds;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Vimeo;

