import Base from '../base.es6';

class Spotify extends Base{
	constructor(input, options, embeds) {
		super(input, options, embeds);
		this.regex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi;
	}

	template(match){
		let template =
		`<div class="ejs-embed">
		<iframe src="https://embed.spotify.com/?uri=spotify:track:${match.split('/')[2]}" height="80"></iframe>
		</div>`;
		return template;
	}
}

module.exports = Spotify;
