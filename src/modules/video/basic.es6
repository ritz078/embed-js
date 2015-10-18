import utils from '../utils.es6';
import Base from '../base.es6';

class BasicVideo extends Base {
	constructor(input, options, embeds) {
		super(input, options, embeds);
		this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
	}

	template(match) {
		var template =
		`<div class="ejs-video">
		<div class="ejs-video-player">
		<div class="ejs-player">
		<video src="${match}" class="ejs-basic-video video-js" controls></video>
		</div>
		</div>
		</div>`;
		return template;
	}

	static postProcess(options) {
let dimensions=utils.dimensions(options);
options.videojsOptions.width = dimensions.width;
options.videojsOptions.height = dimensions.height;
		if (options.videoJS) {
			if (!window.videojs) {
				throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
			}
			var elements = options.element.getElementsByClassName('ejs-basic-video');
			for(var i=0;i<elements.length;i++){
				videojs(elements[i], options.videojsOptions, () => options.videojsCallback());
			}
		}
	}
}

module.exports = BasicVideo;
