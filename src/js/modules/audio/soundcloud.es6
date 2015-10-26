let Base = require('../base.es6');

class SoundCloud extends Base{
	constructor(input, options, embeds) {
		super(input, options, embeds);
		console.log(input,options);
		this.regex = /soundcloud.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;
	}

	template(match) {
		let config = this.options.soundCloudOptions;
		let template =
		`<div class="ejs-embed">
		<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=https://${match}
		&auto_play     = ${config.autoPlay}
		&hide_related  = ${config.hideRelated}
		&show_comments = ${config.showComments}
		&show_user     = ${config.showUser}
		&show_reposts  = ${config.showReposts}
		&visual        = ${config.visual}
		&download      = ${config.download}
		&color         = ${config.themeColor}
		&theme_color   = ${config.themeColor}"></iframe>
		</div>`;
		return template;
	}
}

module.exports = SoundCloud;
