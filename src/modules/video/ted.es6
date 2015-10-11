import utils from '../utils.es6';

import Video from './video.es6';

class Ted extends Video{
	constructor(input,options, embeds){
		super(input, options, embeds);
		this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
	}

	template(id){
		var template = `<div class="ejs-embed">
		<iframe src="http://embed.ted.com/talks/${id.split('/')[2]}.html" height="${videoDimensions.height}" width="${videoDimensions.width}"></iframe>
		</div>`;

	}
}
