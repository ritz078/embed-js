import Base from '../base.es6'

export default class Spotify extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds)
		this.regex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi
		this.service = 'spotify'
	}

	template(match){
		let a = match.split('/')
		let id = a[a.length-1]
		return this.options.template.spotify(id, this.options);
	}
}

