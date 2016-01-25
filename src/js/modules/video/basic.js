import Base from '../base'
import regex from '../regex'

export default class BasicVideo extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex = regex.basicVideo;
		this.service = 'video'
	}

	template(match) {
		console.log(match);
		return this.options.template.basicVideo(match, this.options)
	}
}

