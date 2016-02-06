import { matches, ifInline, ifEmbed } from './utils'
import Base from './base'

/**
 * Plays the video after clicking on the thumbnail
 * @param  {object} options   Options object
 * @return {null}
 */
export function playVideo(options) {
	/** Execute the customVideoClickHandler if the user wants to handle it on his own. */
	if (options.customVideoClickHandler) return options.videoClickHandler(options, template);

	let classes = document.getElementsByClassName(options.videoClickClass);
	for (let i = 0; i < classes.length; i++) {
		classes[i].onclick = function () {
			options.onVideoShow();
			let url                              = this.getAttribute('data-ejs-url') + "?autoplay=true";
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
	return options.template.vimeo(url, options) || options.template.youtube(url, options)
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
	options.videojsOptions.width  = options.videoWidth;
	options.videojsOptions.height = options.videoHeight;
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
	if (_this.options.served.indexOf(url) >= 0) return Promise.resolve(null);

	return new Promise((resolve) => {
		urlToText(_this, match, url).then((text) => {
			if (!text) return resolve();
			_this.options.served.push(url);
			resolve(text);
		})
	})
}

/**
 * A helper function for inline embedding
 * @param _this
 * @param urlToText
 * @returns Promise
 */
export function inlineAsyncEmbed(_this, urlToText) {
	let regexInline     = _this.options.link ? new RegExp(`([^>]*${_this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${_this.regex.source})`, 'gi');
	let match, promises = [];

	while ((match = matches(regexInline, _this.output)) !== null)
		promises.push(getInlineData(_this, urlToText, match));

	return new Promise((resolve) => {
		if (matches.length)
			Promise.all(promises).then((data) => {
				let i        = 0;
				_this.output = _this.output.replace(regexInline, (match) => {
					if (_this.options.link)
						return !_this.options.inlineText ? data[i] + '</a>' : match + data[i++];
					else
						return !_this.options.inlineText ? data[i] : match + data[i++];
				});
				resolve(_this.output)
			});
		else
			resolve(_this.output)
	})
}


function getNormalData(_this, urlToText, match) {
	let url = match[0];
	if (_this.options.served.indexOf(url) >= 0) return;

	return new Promise((resolve) => {
		urlToText(_this, match, url, true).then(function (text) {
			if (!text) resolve();
			_this.options.served.push(url);
			_this.embeds.push({
				text : text,
				index: match.index
			});
			resolve()
		})
	})
}

/**
 * A helper function for normal embedding
 * @param  {object} _this
 * @param  {function} urlToText
 * @return {Promise}
 */
export function normalAsyncEmbed(_this, urlToText) {
	let match, promises = [];
	while ((match = matches(_this.regex, _this.input)) !== null)
		promises.push(getNormalData(_this, urlToText, match));
	return new Promise(function (resolve) {
		Promise.all(promises).then(function () {
			resolve(_this.embeds)
		});
	})
}

export function asyncEmbed(_this, urlToText) {
	return new Promise(function (resolve) {
		if (ifInline(_this.options, _this.service))
			inlineAsyncEmbed(_this, urlToText).then((output) => resolve([output, _this.embeds]));
		else
			normalAsyncEmbed(_this, urlToText).then((embeds) => resolve([_this.output, embeds]))
	})
}

function inlineEmbed(_this){
	let regexInline = _this.options.link ? new RegExp(`([^>]*${_this.regex.source})<\/a>`, 'gm') : new RegExp(`([^\\s]*${_this.regex.source})`, 'gm');
	_this.output     = _this.output.replace(regexInline, function(match) {
		let url = _this.options.link ? match.slice(0, -4) : match;
		if (_this.options.served.indexOf(url) === -1) {
			_this.options.served.push(url);
			if (_this.options.link) {
				return !_this.options.inlineText ? _this.template(match.slice(0, -4)) + '</a>' : match + _this.template(match.slice(0, -4))
			} else {
				return !_this.options.inlineText ? _this.template(match) : match + _this.template(match)
			}
		} else {
			return match; //TODO : check whether this should be `match`
		}
	});
	return [_this.output, _this.embeds];
}

function normalEmbed(_this){
	let match;
	while ((match = matches(_this.regex, _this.input)) !== null) {
		let url = match[0]
		if (!(_this.options.served.indexOf(url) === -1) || (_this.options.served.length && _this.options.singleEmbed)) continue;
		_this.options.served.push(url)
		let text = _this.template(url);
		_this.embeds.push({
			text : text,
			index: match.index
		})
	}
	return [_this.output, _this.embeds];
}

export function embed(_this){
	return (ifInline(_this.options, _this.service)) ? inlineEmbed(_this) : normalEmbed(_this)
}


export function baseEmbed(input, output, embeds, options, regex, service, flag){
	return ifEmbed(options, service) || (ifEmbed(options, service) && flag) ? new Base(input, output, embeds, options, regex, service).process() : [output, embeds]
}
