import Base from '../base.es6'

export class Spotify extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds)
		this.regex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi
		this.service = 'spotify'
	}

	template(match){
		let a = match.split('/')
		let id = a[a.length-1]
		return ejs.template.spotify(id) || `<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:${id}" height="80"></iframe></div>`
	}
}

