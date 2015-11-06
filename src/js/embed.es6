//The MIT License (MIT)
//Copyright (c) 2014 Ritesh Kumar
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

const utils = require('./modules/utils.es6');

if (build.EMOJI) var Emoji = require('./modules/emoticons/emoji.es6');
if (build.SMILEY) var Smiley = require('./modules/emoticons/smiley.es6');
if (build.LINK) var Url = require('./modules/url.es6');

if (build.TWITTER) var Twitter = require('./modules/twitter/twitter.es6');
if (build.MAP) var Gmap = require('./modules/map/map.es6');
if (build.MARKDOWN) var Markdown = require('./modules/markdown.es6');

const Code = require('./modules/code/code.es6');
const Video = require('./modules/video/video.es6');

const Audio = require('./modules/audio/audio.es6');
const Image = require('./modules/image/image.es6');

const helper = require('./modules/video/helper.es6');

(function() {

    var globalOptions;

    var defaultOptions = {
        marked: false,
        markedOptions: {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            sanitizer: null,
            mangle: true,
            smartLists: false,
            silent: false,
            langPrefix: 'lang-',
            smartypants: false,
            headerPrefix: '',
            xhtml: false
        },
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
        highlightCode: true,
        videoJS: false,
        videojsOptions: {
            fluid: true,
            preload: 'metadata'
        },
        locationEmbed: true,
        mapOptions: {
            mode: 'place'
        },
        tweetsEmbed: true,
        tweetOptions: {
            maxWidth: 550,
            hideMedia: false,
            hideThread: false,
            align: 'none',
            lang: 'en'
        },
        imageEmbed: true,
        videoEmbed: true,
        videoHeight: null,
        videoWidth: null,
        videoDetails: true,
        audioEmbed: true,
        excludeEmbed: [],
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
        beforeEmbedJSApply: function() {},
        afterEmbedJSApply: function() {},
        onVideoShow: function() {},
        onTweetsLoad: function() {},
        videojsCallback: function() {}
    };

    class EmbedJS {
        constructor(options, input) {
            //merge global options with the default options
            let globOptions = utils.deepExtend(defaultOptions, globalOptions)

            this.options = utils.deepExtend(globOptions, options);
            this.element = this.options.element || input;
            if (!this.element) {
                throw ReferenceError("You need to pass an element or the string that needs to be processed");
            }
            this.input = this.element.innerHTML;
        }

        /**
         * Processes the string and performs all the insertions and manipulations based on
         * the options and the input provided by the user. This is an asynchronous function using the async/await
         * feature of ES7 and this returns a promise which is resolved once the result data is ready
         * @return {string} The processes resulting string
         */
        async process() {
            let input = this.input;
            let options = this.options;
            let embeds = [];

            this.options.beforeEmbedJSApply();

            let output = options.link && build.LINK ? (new Url(input, options).process()) : output;
            output = options.marked && build.MARKDOWN ? (new Markdown(output, options).process()) : output;
            output = options.emoji && build.EMOJI ? (new Emoji(output, options).process()) : output;
            output = options.fontIcons && build.SMILEY ? (new Smiley(output, options).process()) : output;
            [output, embeds] = (new Code(input, output, options, embeds).process());
            [output, embeds] = await (new Video(input, output, options, embeds).process());
            [output, embeds] = options.locationEmbed ? await (new Gmap(input, output, options, embeds).process()) : [output, embeds];
            [output, embeds] = (new Audio(input, output, options, embeds).process());
            [output, embeds] = (new Image(input, output, options, embeds).process());
            if (options.tweetsEmbed && build.TWITTER) {
                this.twitter = new Twitter(input, options, embeds);
                embeds = options.tweetsEmbed ? await (this.twitter.process()) : output;
            }

            let result = utils.createText(output, embeds);
            return result;
        }

        /**
         * First processes the data by calling the .process() and then renders the data in the div
         * => Loads the twitter widgets
         * => Executes the onTweetsLoad() once all the tweets have been rendered
         * => Applies video.js on the media (both audio and video)
         * => Triggers video loading on click of the video preview
         * => Executes afterEmbedJSApply() once everything is done.
         *
         * @return {}
         */
        async render() {
            let result = await this.process();
            this.options.element.innerHTML = result;

            let event = new Event('rendered');
            this.options.element.dispatchEvent(event);

            helper.applyVideoJS(this.options);

            helper.play('ejs-video-thumb', this.options);

            this.options.afterEmbedJSApply();
        }

        /**
         * returns the resulting string based on the input and the options passed by the user.
         * @param  {Function} callback Function that is executed once the data is ready
         * @return {}
         */
        async text(callback) {
            let result = await this.process();
            callback(result, this.input);
        }

        destroy() {
            this.options.element.removeEventListener('rendered', this.twitter.load(), false);
            helper.destroy('ejs-video-thumb', this.options);
        }
    }

    let ejs = {
        instances:[],
        elements :utils.getElementsByAttributeName('data-embed-js'),
        setOptions  : function(options){
            globalOptions = utils.deepExtend(defaultOptions, options)
        },
        applyEmbedJS: function(){
            for (let i = 0; i < this.elements.length; i++) {
                let option = {
                    element:this.elements[i]
                }
                this.instances[i] = new EmbedJS(option)
                this.instances[i].render()
            }
        },
        destroyEmbedJS: function(){
            for (let i = 0; i < this.elements.length; i++) {
                this.instances[i].destroy()
            }
        }
    }

    window.EmbedJS = EmbedJS
    window.ejs = ejs
})();
