import Base from '../base.es6'

export default class BasicVideo extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
		this.service = 'video'
	}

	template(match) {
		return this.options.template.basicVideo(match, this.options)
	}
}

