let Base = require('../base.es6');

class BasicVideo extends Base {
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds);
		this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
		this.service = 'video'
	}

	template(match) {
		let template =
		`<div class="ejs-video ejs-embed">
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
