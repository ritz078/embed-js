import Base from '../base.es6';

class BasicVideo extends Base {
	constructor(input, options, embeds) {
		super(input, options, embeds);
		this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
	}

	template(match) {
		var template =
		`<div class="ejs-video">
		<div class="ejs-video-player">
		<div class="ejs-player">
		<video src="${match}" class="ejs-video-js video-js" controls></video>
		</div>
		</div>
		</div>`;
		return template;
	}
}

module.exports = BasicVideo;
