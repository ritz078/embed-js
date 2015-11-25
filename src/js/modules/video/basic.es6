import Base from '../base.es6'

export class BasicVideo extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
		this.service = 'video'
	}

	template(match) {
		return ejs.template.basicVideo(match, this.options) || `<div class="ejs-video ejs-embed">
		<div class="ejs-video-player">
		<div class="ejs-player">
		<video src="${match}" class="ejs-video-js video-js" controls></video>
		</div>
		</div>
		</div>`
	}
}

