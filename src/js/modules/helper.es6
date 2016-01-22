import { getDimensions, matches } from './utils.es6'

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
        let elements = options.input.getElementsByClassName('ejs-video-js');
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
 * This is a private function which is used to get the actual text to be replaced for
 * a particular url in inline embedding. This returns a promise
 * @param  {object} _this     reference to this
 * @param  {function} urlToText The function that converts url to replaceable text
 * @param  {object} match     object containing info of matching string
 * @return {Promise}           resolves to the text
 */
function getInlineData(_this, urlToText, match) {
    let url = (_this.options.link ? match[0].slice(0, -4) : match[0]) || match[1];
    if (_this.options.served.indexOf(url) !== -1) return;

    return new Promise((resolve) => {
        urlToText(_this, match, url).then((text) => {
            if (!text) return resolve()
            _this.options.served.push(url);
            resolve(text);
        })
    })
}

/**
 * A helper function for inline embedding
 * @param _this
 * @param urlToText
 * @returns {*}
 */
export function inlineEmbed(_this, urlToText) {
    let regexInline = _this.options.link ? new RegExp(`([^>]*${_this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${_this.regex.source})`, 'gi');
    let match, allMatches = [],
        promises = [];

    while ((match = matches(regexInline, _this.output)) !== null) {
        allMatches.push(match)
        promises.push(getInlineData(_this, urlToText, match))
    }

    return new Promise((resolve) => {
        if (matches.length)
            Promise.all(promises).then((data) => {
                let i = 0;
                _this.output = _this.output.replace(regexInline, (match) => {
                    if (_this.options.link)
                        return !_this.options.inlineText ? data[i] + '</a>' : match + data[i]
                    else
                        return !_this.options.inlineText ? data[i] : match + data[i];
                    i++
                })
                resolve(_this.output)
            })
        else
            resolve(_this.output)
    })
}


function getNormalData(_this, urlToText, match) {
    let url = match[0];
    if (!_this.options.served.indexOf(url) === -1) return;

    return new Promise((resolve) => {
        urlToText(_this, match, url, true).then(function(text) {
            if (!text) resolve()
            _this.options.served.push(url);
            _this.embeds.push({
                text: text,
                index: match.index
            })
            resolve()
        })
    })
}

/**
 * A helper function for normal embedding
 * @param  {object} _this
 * @param  {function} urlToText
 * @return {array}
 */
export function normalEmbed(_this, urlToText) {
    let match, allMatches = [],
        promises = [];

    while ((match = matches(_this.regex, _this.input)) !== null) {
        allMatches.push(match);
        promises.push(getNormalData(_this, urlToText, match))
    }

    return new Promise(function(resolve) {
        if (allMatches.length)
            Promise.all(promises).then(function() {
                resolve(_this.embeds)
            })
        else
            resolve(_this.embeds)
    })
}
