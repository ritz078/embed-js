import Base from '../base.es6'

export class SoundCloud extends Base{
	constructor(input,output, options, embeds) {
		super(input,output, options, embeds);
		this.regex = /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;
		this.service = 'soundcloud'
	}

	template(match) {
		let config = this.options.soundCloudOptions;
		return ejs.template.soundCloud(match, config) || `<div class="ejs-embed">
		<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=${match}
		&auto_play     = ${config.autoPlay}
		&hide_related  = ${config.hideRelated}
		&show_comments = ${config.showComments}
		&show_user     = ${config.showUser}
		&show_reposts  = ${config.showReposts}
		&visual        = ${config.visual}
		&download      = ${config.download}
		&color         = ${config.themeColor}
		&theme_color   = ${config.themeColor}"></iframe>
		</div>`
	}
}

