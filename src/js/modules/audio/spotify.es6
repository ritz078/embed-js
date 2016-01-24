import Base  from '../base.es6'
import regex from '../regex.es6'

export default class Spotify extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds)
		this.regex = regex.spotify;
		this.service = 'spotify'
	}

	template(match){
		let a = match.split('/')
		let id = a[a.length-1]
		return this.options.template.spotify(id, this.options);
	}
}

