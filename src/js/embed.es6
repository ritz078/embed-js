import regeneratorRuntime from './vendor/regeneratorRuntime.js'

import utils from './modules/utils.es6'

import {Emoji}       from './modules/emoticons/emoji.es6'
import {Smiley}      from './modules/emoticons/smiley.es6'
import {Url}         from './modules/url.es6'

import {Twitter}     from './modules/twitter/twitter.es6'
import {Gmap}        from './modules/map/map.es6'
import {Markdown}    from './modules/markdown.es6'

import {Highlight}   from './modules/code/highlight.es6'
import {Ideone}      from './modules/code/ideone.es6'
import {Plunker}     from './modules/code/plunker.es6'
import {JsBin}       from './modules/code/jsbin.es6'
import {CodePen}     from './modules/code/codepen.es6'
import {JsFiddle}    from './modules/code/jsfiddle.es6'
import {Gist}        from './modules/code/gist.es6'

import {Ted}         from './modules/video/ted.es6'
import {Dailymotion} from './modules/video/dailymotion.es6'
import {Ustream}     from './modules/video/ustream.es6'
import {LiveLeak}    from './modules/video/liveleak.es6'
import {Vine}        from './modules/video/vine.es6'
import {Youtube}     from './modules/video/youtube.es6'
import {Vimeo}       from './modules/video/vimeo.es6'
import {BasicVideo}  from './modules/video/basic.es6'

import {SoundCloud}  from './modules/audio/soundcloud.es6'
import {Spotify}     from './modules/audio/spotify.es6'
import {BasicAudio}  from './modules/audio/basic.es6'

import {Flickr}      from './modules/image/flickr.es6'
import {Instagram}   from './modules/image/instagram.es6'
import {Basic}       from './modules/image/basic.es6'

import helper from './modules/video/helper.es6'

(function (window) {
	var globalOptions = {};

	var defaultOptions = {
		marked            : false,
		markedOptions     : {},
		link              : true,
		linkOptions       : {
			target : 'self',
			exclude: ['pdf'],
			rel    : ''
		},
		emoji             : true,
		customEmoji       : [],
		fontIcons         : true,
		customFontIcons   : [],
		highlightCode     : false,
		videoJS           : false,
		videojsOptions    : {
			fluid  : true,
			preload: 'metadata'
		},
		locationEmbed     : true,
		mapOptions        : {
			mode: 'place'
		},
		tweetsEmbed       : false,
		tweetOptions      : {
			maxWidth  : 550,
			hideMedia : false,
			hideThread: false,
			align     : 'none',
			lang      : 'en'
		},
		imageEmbed        : true,
		videoEmbed        : true,
		videoHeight       : null,
		videoWidth        : null,
		videoDetails      : true,
		audioEmbed        : true,
		excludeEmbed      : [],
		inlineEmbed       : [],
		inlineText        : true,
		codeEmbedHeight   : 500,
		vineOptions       : {
			maxWidth  : null,
			type      : 'postcard', //'postcard' or 'simple' embedding
			responsive: true,
			width     : 350,
			height    : 460
		},
		googleAuthKey     : '',
		soundCloudOptions : {
			height      : 160,
			themeColor  : 'f50000', //Hex Code of the player theme color
			autoPlay    : false,
			hideRelated : false,
			showComments: true,
			showUser    : true,
			showReposts : false,
			visual      : false, //Show/hide the big preview image
			download    : false //Show/Hide download buttons
		},
		videoClickClass : 'ejs-video-thumb',
		customVideoClickHandler : false,
		beforeEmbedJSApply: function () {
		},
		afterEmbedJSApply : function () {
		},
		onVideoShow       : function () {
		},
		onTweetsLoad      : function () {
		},
		videojsCallback   : function () {
		},
		videoClickHandler : function () {
		}
	};

	class EmbedJS {
		/**
		 * The constructor takes two arguements. The first one is the options object and the second one is the
		 * optional string . If the user wants to provide a string directly instead of the element, he can do that.
		 * In case the user provides both the input element and the string, the input string will be taken from the element
		 * and the provided string won't be processed.
		 *
		 * @param  {object} options The options object
		 * @param  {string} input   [optional] The string to be processed
		 * @return {null}
		 */
		constructor(options, input) {
			/**
			 * We have created a clone of the original options to make sure that the original object
			 * isn't altered.
			 */
			let defOpts  = utils.cloneObject(defaultOptions);
			let globOpts = utils.cloneObject(globalOptions);

			//merge global options with the default options
			let globOptions = utils.deepExtend(defOpts, globOpts);

			//merge global options with the overriding options provided by the user as an options
			//object while creating a new instance of embed.js
			this.options = utils.deepExtend(globOptions, options);

			if (!this.options.element && !input) throw ReferenceError("You need to pass an element or the string that needs to be processed");

			if (this.options.element) {
				this.element = this.options.element;
				this.input   = this.element.innerHTML;
			} else {
				this.input = input;
			}

		}

		/**
		 * Processes the string and performs all the insertions and manipulations based on
		 * the options and the input provided by the user. This is an asynchronous function using the async/await
		 * feature of ES7 and this returns a promise which is resolved once the result data is ready
		 * @return {string} The processes resulting string
		 */
		async process() {
			let input   = this.input;
			let options = this.options;
			let embeds  = [];
			let output  = '';

			this.options.beforeEmbedJSApply();

			if (LINK && options.link) {
				output = new Url(input, options).process()
			}
			if (MARKDOWN && options.marked) {
				output = new Markdown(output, options).process()
			}
			if (EMOJI && options.emoji) {
				output = new Emoji(output, options).process()
			}
			if (SMILEY && options.fontIcons) {
				output = new Smiley(output, options).process()
			}

			if (HIGHLIGHTCODE && options.highlightCode && !options.marked) {
				output = new Highlight(output, options).process()
			}
			if (IDEONE && utils.ifEmbed(options, 'ideone')) {
				[output, embeds] = new Ideone(input, output, options, embeds).process()
			}
			if (PLUNKER && utils.ifEmbed(options, 'plunker')) {
				[output, embeds] = new Plunker(input, output, options, embeds).process()
			}
			if (JSBIN && utils.ifEmbed(options, 'jsbin')) {
				[output, embeds] = new JsBin(input, output, options, embeds).process()
			}
			if (CODEPEN && utils.ifEmbed(options, 'codepen')) {
				[output, embeds] = new CodePen(input, output, options, embeds).process()
			}
			if (JSFIDDLE && utils.ifEmbed(options, 'jsfiddle')) {
				[output, embeds] = new JsFiddle(input, output, options, embeds).process()
			}
			if (GIST && utils.ifEmbed(options, 'gist')) {
				[output, embeds] = new Gist(input, output, options, embeds).process()
			}


			if (TED && utils.ifEmbed(options, 'ted')) {
				[output, embeds] = new Ted(input, output, options, embeds).process()
			}
			if (DAILYMOTION && utils.ifEmbed(options, 'dailymotion')) {
				[output, embeds] = new Dailymotion(input, output, options, embeds).process()
			}
			if (USTREAM && utils.ifEmbed(options, 'ustream')) {
				[output, embeds] = new Ustream(input, output, options, embeds).process()
			}
			if (LIVELEAK && utils.ifEmbed(options, 'liveleak')) {
				[output, embeds] = new LiveLeak(input, output, options, embeds).process()
			}
			if (BASICVIDEO && options.videoEmbed) {
				[output, embeds] = new BasicVideo(input, output, options, embeds).process()
			}
			if (VINE && utils.ifEmbed(options, 'vine')) {
				[output, embeds] = new Vine(input, output, options, embeds).process()
			}
			if (YOUTUBE && utils.ifEmbed(options, 'youtube') && regeneratorRuntime) {
				[output, embeds] = await new Youtube(input, output, options, embeds).process()
			}
			if (VIMEO && utils.ifEmbed(options, 'vimeo')) {
				[output, embeds] = await new Vimeo(input, output, options, embeds).process()
			}

			if (MAP && options.locationEmbed) {
				[output, embeds] = await new Gmap(input, output, options, embeds).process()
			}

			if (SOUNDCLOUD && utils.ifEmbed(options, 'soundcloud')) {
				[output, embeds] = new SoundCloud(input, output, options, embeds).process()
			}
			if (SPOTIFY && utils.ifEmbed(options, 'spotify')) {
				[output, embeds] = new Spotify(input, output, options, embeds).process()
			}
			if (BASICAUDIO && options.audioEmbed) {
				[output, embeds] = new BasicAudio(input, output, options, embeds).process()
			}

			if (FLICKR && utils.ifEmbed(options, 'flickr')) {
				[output, embeds] = new Flickr(input, output, options, embeds).process()
			}
			if (INSTAGRAM && utils.ifEmbed(options, 'instagram')) {
				[output, embeds] = new Instagram(input, output, options, embeds).process()
			}
			if (BASICIMAGE && options.imageEmbed) {
				[output, embeds] = new Basic(input, output, options, embeds).process()
			}

			if (options.tweetsEmbed && TWITTER) {
				this.twitter     = new Twitter(input, output, options, embeds);
				[output, embeds] = await (this.twitter.process());
			}

			return utils.createText(output, embeds);
		}

		/**
		 * First processes the data by calling the .process() and then renders the data in the div
		 * => Loads the twitter widgets
		 * => Executes the onTweetsLoad() once all the tweets have been rendered
		 * => Applies video.js on the media (both audio and video)
		 * => Triggers video loading on click of the video preview
		 * => Executes afterEmbedJSApply() once everything is done.
		 *
		 * @return null
		 */
		async render() {
			if (!this.element) throw new Error(`You didn't pass an element while creating this instance. render() method can't work without an element`);
			this.element.innerHTML = await this.process();

			helper.applyVideoJS(this.options);

			helper.play(this.options);

			let event = new Event('rendered');
			this.element.dispatchEvent(event);

			this.options.afterEmbedJSApply();
		}

		/**
		 * returns the resulting string based on the input and the options passed by the user.
		 * @param  {Function} callback Function that is executed once the data is ready
		 * @return null
		 */
		async text(callback) {
			let result = await this.process();
			callback(result, this.input);
		}

		/**
		 * The destroy method destroys all the listeners and replaces the rih text with the original text in the
		 * element.
		 * @return {null}
		 */
		destroy() {
			if (!this.element) throw new Error(`destroy() method only if an element had been passed in the options object`);
			helper.destroy('ejs-video-thumb');
			this.element.removeEventListener('rendered', this.twitter.load(), false);
			this.element.innerHTML = this.input
		}
	}

	window.ejs     = {
		instances: [],
		elements : [],

		/**
		 * Sets options globally
		 * @param {object} options
		 */
		setOptions(options) {
			globalOptions = utils.deepExtend(defaultOptions, options)
		},

		/**
		 * Applies embed.js to all the elements with the class name provided as option
		 * @param  {string} className
		 * @return {null}
		 */
		applyEmbedJS(className) {
			if(className.charAt(0) === '.') className = className.substr(1)
			this.elements = document.getElementsByClassName(className);
			for (let i = 0; i < this.elements.length; i++) {
				let option        = {
					element: this.elements[i]
				};
				this.instances[i] = new EmbedJS(option);
				this.instances[i].render()
			}
		},

		/**
		 * Destroys all the instances of EmbedJS created by using ejs.applyEmbedJS method.
		 * @return {null}
		 */
		destroyEmbedJS() {
			for (let i = 0; i < this.elements.length; i++) {
				this.instances[i].destroy()
			}
		},

		template: {
			url() {
			},
			smiley() {
			},
			emoji() {
			},
			basicAudio() {
			},
			soundCloud() {
			},
			spotify() {
			},
			codePen() {
			},
			ideone() {
			},
			jsBin() {
			},
			jsFiddle() {
			},
			plunker() {
			},
			basicImage() {
			},
			flickr() {
			},
			instagram() {
			},
			basicVideo() {
			},
			dailymotion() {
			},
			liveLeak() {
			},
			ted() {
			},
			ustream() {
			},
			detailsVimeo() {
			},
			detailsYoutube() {
			},
			vine() {
			},
			vimeo(){
			},
			youtube(){
			}
		}
	};
	window.EmbedJS = EmbedJS

})(window);
