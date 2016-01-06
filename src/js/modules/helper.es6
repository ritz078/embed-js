import utils from './utils.es6'
import regeneratorRuntime from '../vendor/regeneratorRuntime.js'

var helper = {
    /**
     * Plays the video after clicking on the thumbnail
     * @param  {string} className The class name on which click is to be listened
     * @param  {object} options   Options object
     * @return {null}
     */
    play(options) {
            /** Execute the customVideoClickHandler if the user wants to handle it on his own. */
            if (options.customVideoClickHandler) return options.videoClickHandler(options, this.template)

            let classes = document.getElementsByClassName(options.videoClickClass);
            let _this = this;
            for (let i = 0; i < classes.length; i++) {
                classes[i].onclick = function() {
                    options.onVideoShow();
                    let url = this.getAttribute('data-ejs-url') + "?autoplay=true";
                    this.parentNode.parentNode.innerHTML = _this.template(url, options);
                };
            }
        },

        /**
         * Common template for vimeo and youtube iframes
         * @param  {string} url     URL of the embedding video
         * @param  {object} options Options object
         * @return {string}         compiled template with variables replaced
         */
        template(url, options) {
            let dimensions = utils.dimensions(options);
            return ejs.template.vimeo(url, dimensions, options) || ejs.template.youtube(url, dimensions, options) || `<div class="ejs-video-player ejs-embed">
        <iframe src="${url}" frameBorder="0" width="${dimensions.width}" height="${dimensions.height}"></iframe>
        </div>`
        },

        /**
         * Template for showing vimeo and youtube video details
         * @param  {object} data     Object containing the variable values as key-value pair
         * @param  {string} embedUrl URL of the video
         * @return {string}          template with variables replaced
         */
        detailsTemplate(data, embedUrl) {
            return `<div class="ejs-video ejs-embed">
        <div class="ejs-video-preview">
        <div class="ejs-video-thumb" data-ejs-url="${embedUrl}">
        <div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div>
        <i class="fa fa-play-circle-o"></i>
        </div>
        <div class="ejs-video-detail">
        <div class="ejs-video-title">
        <a href="${data.url}">
        ${data.title}
        </a>
        </div>
        <div class="ejs-video-desc">
        ${data.description}
        </div>
        <div class="ejs-video-stats">
        <span>
        <i class="fa fa-eye"></i>${data.views}
        </span>
        <span>
        <i class="fa fa-heart"></i>${data.likes}
        </span>
        </div>
        </div>
        </div>
        </div>`
        },

        getDetailsTemplate(data, fullData, embedUrl) {
            if (data.host === 'vimeo') {
                return ejs.template.detailsVimeo(data, fullData, embedUrl) || this.detailsTemplate(data, embedUrl)
            } else if (data.host === 'youtube') {
                return ejs.template.detailsYoutube(data, fullData, embedUrl) || this.detailsTemplate(data, embedUrl)
            }
        },

        /**
         * Applies video.js to all audio and video dynamically
         * @param  {object} options Options object
         * @return {null}
         */
        applyVideoJS(options) {
            let dimensions = utils.dimensions(options);
            options.videojsOptions.width = dimensions.width;
            options.videojsOptions.height = dimensions.height;
            if (options.videoJS) {
                if (!window.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
                let elements = options.element.getElementsByClassName('ejs-video-js');
                for (let i = 0; i < elements.length; i++) {
                    videojs(elements[i], options.videojsOptions, () => options.videojsCallback());
                }
            }
        },

        /**
         * Destroys the onclick event for opening the video template from the details template
         * @param  {className} className
         * @return {null}
         */
        destroy(className) {
            let classes = document.getElementsByClassName(className);
            for (let i = 0; i < classes.length; i++) {
                classes[i].onclick = null
            }
        },

        /**
         * A helper function for inline embedding
         * @param _this
         * @param urlToText
         * @returns {*}
         */
        async inlineEmbed(_this, urlToText) {
            if (!regeneratorRuntime) return _this.output;
            let regexInline = _this.options.link ? new RegExp(`([^>]*${_this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${_this.regex.source})`, 'gi');
            let match;
            while ((match = utils.matches(regexInline, _this.output)) !== null) {
                let url = (_this.options.link ? match[0].slice(0, -4) : match[0]) || match[1];
                if (_this.options.served.indexOf(url) !== -1) continue;
                let text = await urlToText(_this, match, url);
                if (!text) continue;
                _this.options.served.push(url);
                if (_this.options.link) {
                    return !_this.options.inlineText ? _this.output.replace(match[0], text + '</a>') : _this.output.replace(match[0], match[0] + text)
                } else {
                    return !_this.options.inlineText ? _this.output.replace(match[0], text) : _this.output.replace(match[0], match[0] + text)
                }
            }
            return _this.output;
        },

		/**
		 * A helper function for normal embedding
		 * @param  {object} _this
		 * @param  {function} urlToText
		 * @return {array}
		 */
        async normalEmbed(_this, urlToText) {
            if (!regeneratorRuntime) return _this.output;
            let match;
            while ((match = utils.matches(_this.regex, _this.input)) !== null) {
                let url = match[0];
                if (!_this.options.served.indexOf(url) === -1) continue;
                let text = await urlToText(_this, match, url, true)
                if (!text) continue;
                _this.options.served.push(url);
                _this.embeds.push({
                    text: text,
                    index: match.index
                })
            }
            return _this.embeds;
        }
};

export default helper;
