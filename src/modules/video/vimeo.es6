import utils from '../utils.es6';

class Vimeo {
	constructor(input, options, embeds) {
		this.input = input;
		this.options = options;
		this.embeds = embeds;

		this.regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;
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

	template(data) {
		var template =
		`<div class="ejs-video">
		<div class="ejs-video-preview">
		<div class="ejs-video-thumb">
		<img src="${data.thumbnail}" alt="${data.host}/${data.id}"/>
		<i class="fa fa-play-circle-o"></i>
		</div>
		<div class="ejs-video-detail">
		<div class="ejs-video-title">
		<a href="${data.url}">${data.title}</a>
		</div>
		<div class="ejs-video-desc">${data.description}</div>
		<div class="ejs-video-stats">
		<span><i class="fa fa-eye"></i>${data.views}</span>
		<span><i class="fa fa-heart"></i>${data.likes}</span>
		</div>
		</div>
		</div>
		</div>`;
		return template;
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
				let text = this.template(this.formatData(data));
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

