import { getDimensions, matches } from './utils.es6'
import regeneratorRuntime from '../vendor/regeneratorRuntime.js'

/**
 * Plays the video after clicking on the thumbnail
 * @param  {string} className The class name on which click is to be listened
 * @param  {object} options   Options object
 * @return {null}
 */
export function playVideo(options) {
    /** Execute the customVideoClickHandler if the user wants to handle it on his own. */
    if (options.customVideoClickHandler) return options.videoClickHandler(options, template);

    let classes = document.getElementsByClassName(options.videoClickClass);
    for (let i = 0; i < classes.length; i++) {
        classes[i].onclick = function() {
            options.onVideoShow();
            let url = this.getAttribute('data-ejs-url') + "?autoplay=true";
            this.parentNode.parentNode.innerHTML = template(url, options);
        };
    }
}

/**
 * Common template for vimeo and youtube iframes
 * @param  {string} url     URL of the embedding video
 * @param  {object} options Options object
 * @return {string}         compiled template with variables replaced
 */
export function template(url, options) {
    let dimensions = getDimensions(options);
    return options.template.vimeo(url, dimensions, options) || options.template.youtube(url, dimensions, options)
}

export function getDetailsTemplate(data, fullData, embedUrl, options) {
    if (data.host === 'vimeo') {
        return options.template.detailsVimeo(data, fullData, embedUrl, options)
    } else if (data.host === 'youtube') {
        return options.template.detailsYoutube(data, fullData, embedUrl, options)
    }
}

/**
 * Applies video.js to all audio and video dynamically
 * @param  {object} options Options object
 * @return {null}
 */
export function applyVideoJS(options) {
    let dimensions = getDimensions(options);
    options.videojsOptions.width = dimensions.width;
    options.videojsOptions.height = dimensions.height;
    if (options.videoJS) {
        if (!window.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
        let elements = options.element.getElementsByClassName('ejs-video-js');
        for (let i = 0; i < elements.length; i++) {
            videojs(elements[i], options.videojsOptions, () => options.videojsCallback());
        }
    }
}

/**
 * Destroys the onclick event for opening the video template from the details template
 * @param  {className} className
 * @return {null}
 */
export function destroyVideos(className) {
    let classes = document.getElementsByClassName(className);
    for (let i = 0; i < classes.length; i++) {
        classes[i].onclick = null
    }
}

/**
 * A helper function for inline embedding
 * @param _this
 * @param urlToText
 * @returns {*}
 */
export async function inlineEmbed(_this, urlToText) {
    if (!regeneratorRuntime) return _this.output;
    let regexInline = _this.options.link ? new RegExp(`([^>]*${_this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${_this.regex.source})`, 'gi');
    let match;
    while ((match = matches(regexInline, _this.output)) !== null) {
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
}

/**
 * A helper function for normal embedding
 * @param  {object} _this
 * @param  {function} urlToText
 * @return {array}
 */
export async function normalEmbed(_this, urlToText) {
    if (!regeneratorRuntime) return _this.output;
    let match;
    while ((match = matches(_this.regex, _this.input)) !== null) {
        let url = match[0];
        if (!_this.options.served.indexOf(url) === -1) continue;
        let text = await urlToText(_this, match, url, true);
        if (!text) continue;
        _this.options.served.push(url);
        _this.embeds.push({
            text: text,
            index: match.index
        })
    }
    return _this.embeds;
}
