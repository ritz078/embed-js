import Base from '../base.es6'

export default class SoundCloud extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds);
		this.regex = /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;
		this.service = 'soundcloud'
	}

	template(match) {
		return this.options.template.soundCloud(match, this.options)
	}
}

