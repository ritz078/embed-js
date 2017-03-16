import { ifEmbed, createText, deepExtend, cloneObject, processOptions } from './modules/utils'

import renderer    from './modules/template'

import emoji       from './modules/emoticons/emoji'
import smiley      from './modules/emoticons/smiley'
import url         from './modules/url'

import Twitter     from './modules/twitter/twitter'
import gmap        from './modules/map/map'
import markdown    from './modules/markdown'

import highlight   from './modules/code/highlight'
import Gist        from './modules/code/gist'

import youtube     from './modules/video/youtube'
import vimeo       from './modules/video/vimeo'

import slideShare  from './modules/image/slideshare'

import openGraph   from './modules/openGraph'
import github      from './modules/github'

import mentions    from './modules/mentions';
import hashtag     from './modules/hashtag';

import regex from './modules/regex'

import { applyPlyr, applyVideoJS, playVideo, destroyVideos, baseEmbed } from './helpers'

let globalOptions = {};

const defaultOptions = {
	marked: false,
	markedOptions: {},
	link: true,
	linkOptions: {
		target: 'self',
		exclude: ['pdf'],
		rel: ''
	},
	emoji: true,
	customEmoji: [],
	fontIcons: true,
	customFontIcons: [],
	highlightCode: false,
	mentions: false,
	hashtag: false,
	videoJS: false,
	videojsOptions: {
		fluid: true,
		preload: 'metadata'
	},
	plyr: false,
	plyrOptions: {},
	locationEmbed: true,
	mapOptions: {
		mode: 'place'
	},
	tweetsEmbed: false,
	tweetOptions: {
		maxWidth: 550,
		hideMedia: false,
		hideThread: false,
		align: 'none',
		lang: 'en'
	},
	singleEmbed: false,
	openGraphEndpoint: null,
	openGraphExclude: [],
	videoEmbed: true,
	videoHeight: null,
	videoWidth: null,
	videoDetails: true,
	audioEmbed: true,
	imageEmbed: true,
	excludeEmbed: [],
	inlineEmbed: [],
	inlineText: true,
	codeEmbedHeight: 500,
	vineOptions: {
		maxWidth: null,
		type: 'postcard', //'postcard' or 'simple' embedding
		responsive: true,
		width: 350,
		height: 460
	},
	plugins: {
		marked: window.marked,
		videojs: window.videojs,
		plyr: window.plyr,
		highlightjs: window.hljs,
		prismjs: window.Prism,
		twitter: window.twttr
	},
	googleAuthKey: '',
	soundCloudOptions: {
		height: 160,
		themeColor: 'f50000', //Hex Code of the player theme color
		autoPlay: false,
		hideRelated: false,
		showComments: true,
		showUser: true,
		showReposts: false,
		visual: false, //Show/hide the big preview image
		download: false //Show/Hide download buttons
	},
	videoClickClass: 'ejs-video-thumb',
	customVideoClickHandler: false,
	mentionsUrl: function () {
	},
	hashtagUrl: function () {
	},
	beforeEmbedJSApply: function () {
	},
	afterEmbedJSApply: function () {
	},
	onVideoShow: function () {
	},
	onTweetsLoad: function () {
	},
	videojsCallback: function () {
	},
	onOpenGraphFetch: function () {
	},
	onOpenGraphFail: function () {
	},
	videoClickHandler: function () {
	},
	served: [] //Private variable used to store processed urls so that they are not processed multiple times.
};

let instances = [];
let allInstances = [];
let promises = [];

export default class EmbedJS {
	/**
	 * The constructor takes two arguments. The first one is the options object and the second one is the
	 * optional string . If the user wants to provide a string directly instead of the element, he can do that.
	 * In case the user provides both the input element and the string, the input string will be taken from the element
	 * and the provided string won't be processed.
	 *
	 * @param  {object} options The options object
	 * @param template
	 * @return {null}
	 */
	constructor(options, template) {
		/**
		 * We have created a clone of the original options to make sure that the original object
		 * isn't altered.
		 */
		let defOpts = cloneObject(defaultOptions);
		let globOpts = cloneObject(globalOptions);

		//merge global options with the default options
		let globOptions = deepExtend(defOpts, globOpts);

		//deepExtend global options with the overriding options provided by the user as an options
		//object while creating a new instance of embed.js
		this.options = deepExtend(globOptions, options);

		this.options.template = deepExtend(renderer, template);

		if (!(typeof this.options.input === 'string' || typeof this.options.input === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

		this.input = (typeof this.options.input === 'object') ? this.options.input.innerHTML : this.options.input

	}

	/**
	 * Processes the string and performs all the insertions and manipulations based on
	 * the options and the input provided by the user. This returns a promise which is resolved once the result data is ready
	 * @return {Promise} The processes resulting string
	 */
	process() {
		const input = this.input;

		if (input === '') return Promise.resolve('');

		const options = processOptions(this.options);
		let embeds = [];
		let output = input;

		this.options.beforeEmbedJSApply();

		return new Promise((resolve) => {
			if (options.link)
				output = url(input, options);

			const openGraphPromise = options.openGraphEndpoint ? openGraph(input, output, options, embeds) : Promise.resolve([output, embeds]);

			openGraphPromise.then(function ([output, embeds]) {
				if (options.highlightCode) {
					output = highlight(output, options)
				}
				if (options.marked) {
					output = markdown(output, options)
				}
				if (options.emoji) {
					output = emoji(output, options)
				}
				if (options.fontIcons) {
					output = smiley(output, options)
				}
				if (options.mentions) {
					output = mentions(output, options);
				}
				if (options.hashtag) {
					output = hashtag(output, options);
				}

				[output, embeds] = baseEmbed(input, output, embeds, options, regex.ideone, 'ideone');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.plunker, 'plunker');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.jsbin, 'jsbin');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.codepen, 'codepen');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.jsfiddle, 'jsfiddle');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.ted, 'ted');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.dailymotion, 'dailymotion');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.ustream, 'ustream');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.liveleak, 'liveleak');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.basicVideo, 'video', options.videoEmbed);
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.vine, 'vine');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.soundCloud, 'soundcloud');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.spotify, 'spotify');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.basicAudio, 'audio', options.audioEmbed);
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.flickr, 'flickr');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.instagram, 'instagram');
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.basicImage, 'image', options.imageEmbed);
				[output, embeds] = baseEmbed(input, output, embeds, options, regex.facebook, 'facebook');

				if (ifEmbed(options, 'gist')) {
					[output, embeds] = new Gist(input, output, options, embeds).process()
				}

				return ifEmbed(options, 'youtube') ? youtube(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(function ([output, embeds]) {
				return ifEmbed(options, 'vimeo') ? vimeo(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(function ([output, embeds]) {
				return ifEmbed(options, 'github') ? github(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(function ([output, embeds]) {
				return options.locationEmbed && ifEmbed(options, 'gmap') ? gmap(input, output, options, embeds) : Promise.resolve([output, embeds])
			}).then(function ([output, embeds]) {
				return ifEmbed(options, 'slideshare') ? slideShare(input, output, options, embeds) : Promise.resolve([output, embeds]);
			}).then(([output, embeds]) => {
				if (options.tweetsEmbed && ifEmbed(options, 'twitter')) {
					this.twitter = new Twitter(input, output, options, embeds);
					return this.twitter.process()
				} else {
					return Promise.resolve([output, embeds])
				}
			}).then(([output, embeds]) => {
				this.data = {
					input: options.input,
					output,
					options,
					inputString: this.input,
					services: options.served,
					template: options.template
				};

				resolve(createText(output, embeds))

			})
		})
	}

	/**
	 * First processes the data by calling the .process() and then renders the data in the div
	 * => Loads the twitter widgets
	 * => Executes the onTweetsLoad() once all the tweets have been rendered
	 * => Applies video.js on the media (both audio and video)
	 * => Triggers video loading on click of the video preview
	 * => Executes afterEmbedJSApply() once everything is done.
	 *
	 * @return Promise
	 */
	render() {
		if (typeof this.options.input === 'string') throw new Error(`You cannot call render method for a string`);
		if (!this.options.input) throw new Error(`You didn't pass an element while creating this instance. render() method can't work without an input element`);

		return new Promise((resolve) => {
			this.process().then((data) => {
				this.options.input.innerHTML = data;
				this.options.input.className += ' embed-js-applied';
				this.applyListeners();
				resolve(this.data);
			})
		})
	}

	/**
	 * This method listens to all the events like click, handle
	 * events to be done after an element has been rendered. These
	 * include twitter widget rendering, gist embedding, click event listeners .
	 */
	applyListeners() {
		applyVideoJS(this.options);
		applyPlyr(this.options);

		playVideo(this.options);

		let event = new Event('rendered');
		this.options.input.dispatchEvent(event);

		this.options.afterEmbedJSApply();
	}


	/**
	 * This function updates the parametrs of the current instance
	 * @param options   New updated options object. will be extended with the older options
	 * @param template  [optional] the new template instance
	 */
	update(options, template) {

		if (options)
			this.options = deepExtend(this.options, options);

		if (template)
			this.options.template = template;

		if (!this.options.input || !(typeof this.options.input === 'string' || typeof this.options.input === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

		this.input = (typeof this.options.input === 'object') ? this.options.input.innerHTML : this.options.input
	}

	/**
	 * returns the resulting string based on the input and the options passed by the user.
	 * @return Promise
	 */
	text(callback) {
		this.process().then((data) => callback(data, this.input))
	}

	/**
	 * The destroy method destroys all the listeners and replaces the rih text with the original text in the
	 * element.
	 * @return {null}
	 */
	destroy() {
		if (typeof this.options.input !== 'object') throw new Error(`destroy() method only works if an element had been passed in the options object`);
		destroyVideos('ejs-video-thumb');
		if (this.options.tweetsEmbed)
			this.options.input.removeEventListener('rendered', this.twitter.load(), false);
		this.options.input.innerHTML = this.input
	}

	/**
	 * Sets options globally
	 * @param {object} options
	 */
	static setOptions(options) {
		globalOptions = deepExtend(defaultOptions, options)
	}

	/**
	 * Applies embed.js to all the elements with the class name provided as option
	 * @return {Promise}
	 * @param selectorName
	 * @param options
	 * @param template
	 */
	static applyEmbedJS(selectorName, options = {}, template = renderer) {
		let elements = document.querySelectorAll(selectorName);
		for (let i = 0; i < elements.length; i++) {
			options.input = elements[i];
			instances[i] = new EmbedJS(options, template);
			promises[i] = instances[i].render()
		}
		return new Promise(function (resolve) {
			Promise.all(promises).then(function (val) {
				resolve(val);
			})
		})
	}

	/**
	 * Destroys all the instances of EmbedJS created by using applyEmbedJS() method.
	 * @return {null}
	 */
	static destroyEmbedJS() {
		for (let i = 0; i < instances.length; i++) {
			instances[i].destroy()
		}
	}

	/**
	 * Destroys all instances of EmbedJS on the page
	 * @return {null}
	 */
	static destroyAll() {
		for (let i = 0; i < allInstances.length; i++) {
			allInstances[i].destroy()
		}
	}

	/**
	 * Creates a new instance of the Template constructor. This has been done so that multiple
	 * templates of a single service can be used by creating different instances of the Template.
	 *
	 * The usage of the plugin is described below.
	 *
	 * => Create a new Instance of the template by using .Template() method of EmbedJS.
	 *
	 *        var template = EmbedJS.Template()
	 *
	 * => Now create different templates for different service names.
	 *
	 *        template.url = function(match, options){
     * 			return '<a href=" + match + "> + match + </a>'
     * 		}
	 *
	 *        template.instagram = function(match, dimensions, options){
     * 			var config = options.soundCloudOptions;
     * 			return `<div class="ejs-embed ejs-instagram"><iframe src="${toUrl(match.split('/?')[0])}/embed/" height="${dimensions.height}"></iframe></div>`;
     * 		}
	 *
	 */
	static Template() {
		return renderer;
	}
}
