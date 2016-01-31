import Base  from '../base'
import regex from '../regex'
import { lastElement } from '../utils'

export default class Spotify extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds);
		this.regex = regex.spotify;
		this.service = 'spotify'
	}

	template(match){
		let id = lastElement(match.split('/'));
		return this.options.template.spotify(id, this.options);
	}
}

