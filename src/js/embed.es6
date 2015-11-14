const utils = require('./modules/utils.es6');

/**
 *
 * `build` object is defined in the file `build.json` present in the root folder of the project
 * It is used to create a custom build of the plugin. Webpack uses the object and sets it as a global variable
 * while creating the build. Later UglifyJS removes the dead code from the file and a custom build is created.
 *
 * Eg: Webpack converts
 *     if (build.EMOJI){
 *         var Emoji = require('./modules/emoticons/emoji.es6');
 *     }
 *     to
 *     if (true){
 *        var Emoji = require('./modules/emoticons/emoji.es6');
 *     }
 *     assuming that build.EMOJI is set to true in build.json
 *     While processing UglifyJS removes the conditions if its always true. In case its set to false, UglifyJS
 *     identifies the code in that block as dead code and removes it as that code won't be executed anyways.
 *
 * We have used `require` instead of `import` as according to ES6 spec `import` can't be put inside any conditional block
 * and it should be present at the top of the file.
 *
 */

if    (build.EMOJI)    var Emoji    = require('./modules/emoticons/emoji.es6');
if    (build.SMILEY)   var Smiley   = require('./modules/emoticons/smiley.es6');
if    (build.LINK)     var Url      = require('./modules/url.es6');

if    (build.TWITTER)  var Twitter  = require('./modules/twitter/twitter.es6');
if    (build.MAP)      var Gmap     = require('./modules/map/map.es6');
if    (build.MARKDOWN) var Markdown = require('./modules/markdown.es6');

const Code                          = require('./modules/code/code.es6');
const Video                         = require('./modules/video/video.es6');
const Audio                         = require('./modules/audio/audio.es6');
const Image                         = require('./modules/image/image.es6');
const helper                        = require('./modules/video/helper.es6');

(function(window) {

    var globalOptions = {};

    var defaultOptions = {
        marked             : false,
        markedOptions      : {},
        link               : true,
        linkOptions        : {
            target             : 'self',
            exclude            : ['pdf'],
            rel                : ''
        },
        emoji              : true,
        customEmoji        : [],
        fontIcons          : true,
        customFontIcons    : [],
        highlightCode      : true,
        videoJS            : false,
        videojsOptions     : {
            fluid              : true,
            preload            : 'metadata'
        },
        locationEmbed      : true,
        mapOptions         : {
            mode               : 'place'
        },
        tweetsEmbed        : true,
        tweetOptions       : {
        maxWidth           : 550,
        hideMedia          : false,
        hideThread         : false,
        align              : 'none',
        lang               : 'en'
        },
        imageEmbed         : true,
        videoEmbed         : true,
        videoHeight        : null,
        videoWidth         : null,
        videoDetails       : true,
        audioEmbed         : true,
        excludeEmbed       : [],
		inlineEmbed        : [],
        inlineText         : true,
        codeEmbedHeight    : 500,
        vineOptions        : {
            maxWidth           : null,
            type               : 'postcard', //'postcard' or 'simple' embedding
            responsive         : true,
            width              : 350,
            height             : 460
        },
        googleAuthKey      : '',
        soundCloudOptions  : {
            height             : 160,
            themeColor         : 'f50000', //Hex Code of the player theme color
            autoPlay           : false,
            hideRelated        : false,
            showComments       : true,
            showUser           : true,
            showReposts        : false,
            visual             : false, //Show/hide the big preview image
            download           : false //Show/Hide download buttons
        },
        beforeEmbedJSApply : function() {},
        afterEmbedJSApply  : function() {},
        onVideoShow        : function() {},
        onTweetsLoad       : function() {},
        videojsCallback    : function() {}
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
            let defOpts  = utils.cloneObject(defaultOptions)
            let globOpts = utils.cloneObject(globalOptions)

            //merge global options with the default options
            let globOptions = utils.deepExtend(defOpts, globOpts)

            //merge global options with the overriding options provided by the user as an options
            //object while creating a new instance of embed.js
            this.options = utils.deepExtend(globOptions, options);

            if (!this.options.element && !input) throw ReferenceError("You need to pass an element or the string that needs to be processed")

            if (this.options.element) {
                this.element = this.options.element;
                this.input = this.element.innerHTML;
            }else{
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

            output           = options.link && build.LINK ? (new Url(input, options).process())             : input;
            output           = options.marked && build.MARKDOWN ? (new Markdown(output, options).process()) : output;
            output           = options.emoji && build.EMOJI ? (new Emoji(output, options).process())        : output;
            output           = options.fontIcons && build.SMILEY ? (new Smiley(output, options).process())  : output;
            [output, embeds] = (new Code(input, output, options, embeds).process());
            [output, embeds] = await (new Video(input, output, options, embeds).process());
            [output, embeds] = options.locationEmbed ? await (new Gmap(input, output, options, embeds).process()) : [output, embeds];
            [output, embeds] = (new Audio(input, output, options, embeds).process());
            [output, embeds] = (new Image(input, output, options, embeds).process());

            if (options.tweetsEmbed && build.TWITTER) {
                this.twitter = new Twitter(input,output, options, embeds);
                [output, embeds] = await (this.twitter.process());
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
            if(!this.element) throw new Error(`You didn't pass an element while creating this instance. render() method can't work without an element`)
            let result = await this.process();
            this.element.innerHTML = result;

            helper.applyVideoJS(this.options);

            helper.play('ejs-video-thumb', this.options);

            let event = new Event('rendered');
            this.element.dispatchEvent(event);

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

        /**
         * The destroy method destroys all the listeners and replaces the rih text with the original text in the
         * element.
         * @return {null}
         */
        destroy() {
            if(!this.element) throw new Error(`destroy() method only if an element had been passed in the options object`)
            helper.destroy('ejs-video-thumb', this.options)
            this.element.removeEventListener('rendered', this.twitter.load(), false)
            this.element.innerHTML = this.input
        }
    }

    let ejs = {
        instances : [],
        elements  : [],

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
            this.elements = document.getElementsByClassName(className)
            for (let i = 0; i < this.elements.length; i++) {
                let option = {
                    element: this.elements[i]
                }
                this.instances[i] = new EmbedJS(option)
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
        }
    }

    window.EmbedJS = EmbedJS
    window.ejs     = ejs

})(window);
