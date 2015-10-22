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

import utils      from './modules/utils.es6';
import Emoji      from './modules/emoticons/emoji.es6';
import Smiley     from './modules/emoticons/smiley.es6';
import Url        from './modules/url.es6';
import Code       from './modules/code/code.es6';
import Video      from './modules/video/video.es6';
import Twitter    from './modules/twitter/twitter.es6';
import Audio      from './modules/audio/audio.es6';
import Image      from './modules/image/image.es6';

import helper from './modules/video/helper.es6';

(function() {

    var defaultOptions = {
        link            : true,
        linkOptions     : {
            target  : 'self',
            exclude : ['pdf']
        },
        emoji           : true,
        customEmoji     : [],
        fontIcons       : true,
        highlightCode   : true,
        videoJS         : false,
        videojsOptions  : {
            fluid:true,
            preload:'metadata'
        },
        tweetsEmbed     : true,
        tweetOptions    : {
            maxWidth   : 550,
            hideMedia  : false,
            hideThread : false,
            align      : 'none',
            lang       : 'en'
        },
        imageEmbed      : true,
        videoEmbed      : true,
        videoHeight     : null,
        videoWidth      : null,
        videoDetails    : true,
        audioEmbed      : true,
        excludeEmbed    : [],
        codeEmbedHeight : 500,
        vineOptions     : {
            maxWidth   : null,
            type       : 'postcard', //'postcard' or 'simple' embedding
            responsive : true,
            width      : 350,
            height     : 460
        },
        googleAuthKey   : 'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts',
        soundCloudOptions : {
            height      : 160,
            themeColor  : 'f50000',   //Hex Code of the player theme color
            autoPlay    : false,
            hideRelated : false,
            showComments: true,
            showUser    : true,
            showReposts : false,
            visual      : false,         //Show/hide the big preview image
            download    : false          //Show/Hide download buttons
        },
        beforeEmbedJSApply : function(){},
        afterEmbedJSApply  : function(){},
        onVideoShow        : function(){},
        onTweetsLoad       : function(){},
        videojsCallback    : function(){}
    };

    class EmbedJS {
        constructor(options, input) {
            this.options = utils.deepExtend(defaultOptions, options);
            this.element = this.options.element || input;
            if(!this.element){
                throw ReferenceError ("You need to pass an element or the string that needs to be processed");
            }
            this.input   = this.element.innerHTML;
        }

        /**
         * Processes the string and performs all the insertions and manipulations based on
         * the options and the input provided by the user. This is an asynchronous function using the async/await
         * feature of ES7 and this returns a promise which is resolved once the result data is ready
         * @return {string} The processes resulting string
         */
        async process() {
            let input        = this.input;
            let options      = this.options;
            let embeds       = [];

            this.options.beforeEmbedJSApply();

            let output       = options.link ? (new Url(input, options).process()) : output;
            output           = options.emoji ? (new Emoji(output, options).process()) : output;
            output           = options.fontIcons ? (new Smiley(output, options).process()) : output;
            [output, embeds] = (new Code(input, output, options, embeds).process());
            [output, embeds] = await (new Video(input, output, options, embeds).process());
            [output, embeds] = (new Audio(input, output, options, embeds).process());
            [output, embeds] = (new Image(input, output, options, embeds).process());
            if (options.tweetsEmbed) {
                let twitter = new Twitter(input, options, embeds);
                embeds = options.tweetsEmbed ? await (twitter.process()) : output;
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

            if(twttr){
               //Load twitter data with styling
                twttr.widgets.load(this.options.element);

                //Execute the function after the widget is loaded
                twttr.events.bind('loaded', ()=>{
                    this.options.onTweetsLoad();
                });
            }

            helper.applyVideoJS(this.options);

            helper.play('ejs-video-thumb', this.options);

            this.options.afterEmbedJSApply();
        }

        /**
         * returns the resulting string based on the input and the options passed by the user.
         * @param  {Function} callback Function that is executed once the data is ready
         * @return {}
         */
        async text(callback){
            let result = await this.process();
            callback(result);
        }
    }

    window.EmbedJS = EmbedJS;
})();
