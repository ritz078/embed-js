import { ifEmbed, createText, deepExtend, cloneObject } from './modules/utils.es6'

import Renderer from './modules/renderer.es6'

import Emoji from './modules/emoticons/emoji.es6'
import Smiley from './modules/emoticons/smiley.es6'
import Url from './modules/url.es6'

import Twitter from './modules/twitter/twitter.es6'
import Gmap from './modules/map/map.es6'
import Markdown from './modules/markdown.es6'

import Highlight from './modules/code/highlight.es6'
import Ideone from './modules/code/ideone.es6'
import Plunker from './modules/code/plunker.es6'
import JsBin from './modules/code/jsbin.es6'
import CodePen from './modules/code/codepen.es6'
import JsFiddle from './modules/code/jsfiddle.es6'
import Gist from './modules/code/gist.es6'

import Ted from './modules/video/ted.es6'
import Dailymotion from './modules/video/dailymotion.es6'
import Ustream from './modules/video/ustream.es6'
import LiveLeak from './modules/video/liveleak.es6'
import Vine from './modules/video/vine.es6'
import Youtube from './modules/video/youtube.es6'
import Vimeo from './modules/video/vimeo.es6'
import BasicVideo from './modules/video/basic.es6'

import SoundCloud from './modules/audio/soundcloud.es6'
import Spotify from './modules/audio/spotify.es6'
import BasicAudio from './modules/audio/basic.es6'

import Flickr from './modules/image/flickr.es6'
import Instagram from './modules/image/instagram.es6'
import Basic from './modules/image/basic.es6'
import SlideShare from './modules/image/slideshare.es6'

import OpenGraph from './modules/openGraph.es6'
import Github from './modules/github.es6'

import {
    applyVideoJS, playVideo, destroyVideos
}
from './modules/helper.es6'

var globalOptions = {};

var defaultOptions = {
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
    videoJS: false,
    videojsOptions: {
        fluid: true,
        preload: 'metadata'
    },
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
    openGraphEndpoint: null,
    openGraphExclude: [],
    videoEmbed: true,
    videoHeight: null,
    videoWidth: null,
    videoDetails: true,
    audioEmbed: true,
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
    beforeEmbedJSApply: function() {},
    afterEmbedJSApply: function() {},
    onVideoShow: function() {},
    onTweetsLoad: function() {},
    videojsCallback: function() {},
    onOpenGraphFetch: function() {},
    onOpenGraphFail: function() {},
    videoClickHandler: function() {},
    served: [] //Private variable used to store processed urls so that they are not processed multiple times.
};

let instances = [];
let allInstances = [];
let promises = [];

export default class EmbedJS {
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

        this.options.template = template || new Renderer();

        if (!this.options.input || !(typeof this.options.input === 'string' || typeof this.options.input === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

        this.input = (typeof this.options.input === 'object') ? this.options.input.innerHTML : this.options.input

    }

    /**
     * Processes the string and performs all the insertions and manipulations based on
     * the options and the input provided by the user. This is an asynchronous function using the async/await
     * feature of ES7 and this returns a promise which is resolved once the result data is ready
     * @return {string} The processes resulting string
     */
    process() {
        let input = this.input;
        let options = this.options;
        let embeds = [];
        let output = '';

        this.options.beforeEmbedJSApply();

        return new Promise((resolve) => {
            if (options.link) {
                output = new Url(input, options).process()
            }

            let openGraphPromise = OPENGRAPH && options.openGraphEndpoint ? new OpenGraph(input, output, options, embeds).process() : Promise.resolve([output, embeds])

            openGraphPromise.then(([output, embeds]) => {
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
                if (IDEONE && ifEmbed(options, 'ideone')) {
                    [output, embeds] = new Ideone(input, output, options, embeds).process()
                }
                if (PLUNKER && ifEmbed(options, 'plunker')) {
                    [output, embeds] = new Plunker(input, output, options, embeds).process()
                }
                if (JSBIN && ifEmbed(options, 'jsbin')) {
                    [output, embeds] = new JsBin(input, output, options, embeds).process()
                }
                if (CODEPEN && ifEmbed(options, 'codepen')) {
                    [output, embeds] = new CodePen(input, output, options, embeds).process()
                }
                if (JSFIDDLE && ifEmbed(options, 'jsfiddle')) {
                    [output, embeds] = new JsFiddle(input, output, options, embeds).process()
                }
                if (GIST && ifEmbed(options, 'gist')) {
                    [output, embeds] = new Gist(input, output, options, embeds).process()
                }


                if (TED && ifEmbed(options, 'ted')) {
                    [output, embeds] = new Ted(input, output, options, embeds).process()
                }
                if (DAILYMOTION && ifEmbed(options, 'dailymotion')) {
                    [output, embeds] = new Dailymotion(input, output, options, embeds).process()
                }
                if (USTREAM && ifEmbed(options, 'ustream')) {
                    [output, embeds] = new Ustream(input, output, options, embeds).process()
                }
                if (LIVELEAK && ifEmbed(options, 'liveleak')) {
                    [output, embeds] = new LiveLeak(input, output, options, embeds).process()
                }
                if (BASICVIDEO && options.videoEmbed) {
                    [output, embeds] = new BasicVideo(input, output, options, embeds).process()
                }
                if (VINE && ifEmbed(options, 'vine')) {
                    [output, embeds] = new Vine(input, output, options, embeds).process()
                }

                if (SOUNDCLOUD && ifEmbed(options, 'soundcloud')) {
                    [output, embeds] = new SoundCloud(input, output, options, embeds).process()
                }
                if (SPOTIFY && ifEmbed(options, 'spotify')) {
                    [output, embeds] = new Spotify(input, output, options, embeds).process()
                }
                if (BASICAUDIO && options.audioEmbed) {
                    [output, embeds] = new BasicAudio(input, output, options, embeds).process()
                }

                if (FLICKR && ifEmbed(options, 'flickr')) {
                    [output, embeds] = new Flickr(input, output, options, embeds).process()
                }
                if (INSTAGRAM && ifEmbed(options, 'instagram')) {
                    [output, embeds] = new Instagram(input, output, options, embeds).process()
                }
                if (BASICIMAGE && options.imageEmbed) {
                    [output, embeds] = new Basic(input, output, options, embeds).process()
                }

                let youtubePromise = YOUTUBE && ifEmbed(options, 'youtube') ? new Youtube(input, output, options, embeds).process() : Promise.resolve([output, embeds]);

                return youtubePromise;
            }).then(([output, embeds]) => {
                let vimeoPromise = VIMEO && ifEmbed(options, 'vimeo') ? new Vimeo(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
                return vimeoPromise;
            }).then(([output, embeds]) => {
                let githubPromise = GITHUB && ifEmbed(options, 'opengraph') ? new Github(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
                return githubPromise;
            }).then(([output, embeds]) => {
                let mapPromise = MAP && options.locationEmbed ? new Gmap(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
                return mapPromise
            }).then(([output, embeds]) => {
                let slideSharePromise = SLIDESHARE && ifEmbed(options, 'slideshare') ? new SlideShare(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
                return slideSharePromise;
            }).then(([output, embeds]) => {
                if (options.tweetsEmbed && TWITTER) {
                    this.twitter = new Twitter(input, output, options, embeds);
                    return this.twitter.process()
                } else {
                    return Promise.resolve([output, embeds])
                }
            }).then(([output, embeds]) => {
                this.data = {
                    input: options.input,
                    output: output,
                    options: options,
                    inputString: this.input,
                    /**

                    	TODO:
                    	- Restructure served urls structure with services name

                     */

                    services: options.served,
                    template: options.template
                }

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
     * @return null
     */
    render() {
        if (typeof this.options.input === 'string') throw new Error(`You cannot call render method for a string`)
        if (!this.options.input) throw new Error(`You didn't pass an element while creating this instance. render() method can't work without an input element`);

        return new Promise((resolve) => {
            this.process().then((data) => {
                this.options.input.innerHTML = data;
                applyVideoJS(this.options);

                playVideo(this.options);

                let event = new Event('rendered');
                this.options.input.dispatchEvent(event);

                this.options.afterEmbedJSApply();

                resolve(this.data);
            })
        })
    }

    /**
     * returns the resulting string based on the input and the options passed by the user.
     * @param  {Function} callback Function that is executed once the data is ready
     * @return null
     */
    text() {
        return new Promise((resolve) => {
            this.process().then(() => {
                resolve(this.data)
            })
        })
    }

    /**
     * The destroy method destroys all the listeners and replaces the rih text with the original text in the
     * element.
     * @return {null}
     */
    destroy() {
        if (!this.element) throw new Error(`destroy() method only if an element had been passed in the options object`);
        destroyVideos('ejs-video-thumb');
        this.element.removeEventListener('rendered', this.twitter.load(), false);
        this.element.innerHTML = this.input
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
     * @param  {string} className
     * @return {null}
     */
    static applyEmbedJS(selectorName, options = {}, template = (new Renderer())) {
        let elements = document.querySelectorAll(selectorName);
        for (let i = 0; i < elements.length; i++) {
            options.input = elements[i];
            instances[i] = new EmbedJS(options, template);
            promises[i] = instances[i].render()
        }
        return new Promise((resolve) => {
            Promise.all(promises).then(function(val) {
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
     * 		var template = EmbedJS.Template()
     *
     * => Now create different templates for different service names.
     *
     * 		template.url = function(match, options){
     * 			return '<a href=" + match + "> + match + </a>'
     * 		}
     *
     * 		template.instagram = function(match, dimensions, options){
     * 			var config = options.soundCloudOptions;
     * 			return `<div class="ejs-embed ejs-instagram"><iframe src="${toUrl(match.split('/?')[0])}/embed/" height="${dimensions.height}"></iframe></div>`;
     * 		}
     *
     */
    static Template() {
        return new Renderer();
    }
}
