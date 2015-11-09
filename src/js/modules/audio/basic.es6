let Base = require('../base.es6');

class BasicAudio extends Base {
	constructor(input, options, embeds) {
		super(input, options, embeds);
		this.regex = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi;
	}

	template(match) {
		let template =
		`<div class="ejs-audio ejs-embed">
		<audio src="${match}" controls class="video-js ejs-video-js"></audio>
		</div>`;
		return template;
	}
}

module.exports = BasicAudio;
