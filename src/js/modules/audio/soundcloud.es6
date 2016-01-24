import Base from '../base.es6'
import regex from '../regex.es6'

export default class SoundCloud extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds);
		this.regex = regex.soundCloud;
		this.service = 'soundcloud'
	}

	template(match) {
		return this.options.template.soundCloud(match, this.options)
	}
}

