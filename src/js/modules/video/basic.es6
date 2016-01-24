import Base from '../base.es6'
import regex from '../regex.es6'

export default class BasicVideo extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex = regex.basicAudio;
		this.service = 'video'
	}

	template(match) {
		return this.options.template.basicVideo(match, this.options)
	}
}

