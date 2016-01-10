'use strict';

var babelHelpers_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var babelHelpers_classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var babelHelpers_createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var babelHelpers_inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var babelHelpers_possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var babelHelpers_slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * Trucates the string and adds ellipsis at the end.
 * @param string        The string to be truncated
 * @param n             Length to which it should be truncated
 * @returns {string}    The truncated string
 */
function truncate(string, n) {
    return string.substr(0, n - 1) + (string.length > n ? '...' : '');
}

/**
 * Returns an array after removing the duplicates.
 * @param array         The array containing the duplicates
 * @returns {Array}     Array with unique values.
 */
function getUnique(array) {
    var u = {},
        a = [];

    array.forEach(function (value) {
        if (!u.hasOwnProperty(value)) {
            a.push(value);
            u[value] = 1;
        }
    });
    return a;
}

/**
 * Converts a string into legitimate url.
 * @param string
 */
function toUrl(string) {
    return string.indexOf('//') === -1 ? '//' + string : string;
}

/**
 * Extends an Object
 * @param destination
 * @param source
 * @returns {*}
 */
function deepExtend(destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            deepExtend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Sort an array of objects based on the index value
 * @param  {Array} arr Array to be sorted
 * @return {Array}     Sorted array
 */
function sortObject(arr) {
    return arr.sort(function (a, b) {
        return a.index - b.index;
    });
}

/**
 * Creates the string of the iframes after sorting them and finally returning a string
 * @param  {sring} str    String to which the created text has to be added
 * @param  {object} embeds Sorted array of iframe html
 * @return {string}        String to be rendered
 */
function createText(str, embeds) {
    var sortedEmbeds = sortObject(embeds);
    for (var i = 0; i < sortedEmbeds.length; i++) {
        str += ' ' + sortedEmbeds[i].text;
    }
    return str;
}

/**
 * Matches the string and finds the substrings matching to the provided regex pattern
 * @param  {object} regex Regex pattern
 * @param  {string} input The string to be analyzed
 * @return {object}       Returns the matched substring with their corresponding positions
 */
function matches(regex, input) {
    return regex.exec(input);
}

/**
 * Checks wheteher a particular service should be embedded or not based on
 * the setting provided by the user
 * @param  {object} options The options provided by the user
 * @param  {string} service Name of the service for which the condition is to be analyzed
 * @return {boolean}        True if it should be embedded
 */
function ifEmbed(options, service) {
    return options.excludeEmbed.indexOf(service) == -1 && options.excludeEmbed !== 'all';
}

function ifInline(options, service) {
    return options.inlineEmbed.indexOf(service) == -1 && options.inlineEmbed !== 'all';
}

/**
 * Calculates the dimensions for the elements based on a aspect ratio
 * @param  {object} options Plugin options
 * @return {object}         The width and height of the elements
 */
function getDimensions(options) {
    var dimensions = {
        width: options.videoWidth,
        height: options.videoHeight
    };
    if (options.videoHeight && options.videoWidth) {
        return dimensions;
    } else if (options.videoHeight) {
        options.videoWidth = dimensions.width = options.videoHeight / 3 * 4;
        return dimensions;
    } else if (options.videoWidth) {
        options.videoHeight = dimensions.height = dimensions.width / 4 * 3;
        return dimensions;
    } else {
        var _ref3;

        var _ref = (_ref3 = [800, 600], dimensions.width = _ref3[0], dimensions.height = _ref3[1], _ref3);

        var _ref2 = babelHelpers_slicedToArray(_ref, 2);

        options.videoWidth = _ref2[0];
        options.videoHeight = _ref2[1];

        return dimensions;
    }
}

/**
 * Returns a cloned object
 * @param  {object} obj
 * @return {object}     cloned object
 */
function cloneObject(obj) {
    if (obj === null || (typeof obj === 'undefined' ? 'undefined' : babelHelpers_typeof(obj)) !== 'object') return obj;
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
    return temp;
}

function urlRegex() {
    return (/((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:buff\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi
    );
}

var expect = chai.expect;

describe('utility methods unit tests', function () {
	describe('toUrl() method', function () {
		"use strict";

		it('should convert string into a valid url', function () {
			expect(toUrl('github.com')).to.equal('//github.com');
			expect(toUrl('//github.com')).to.equal('//github.com');
		});

		it('should return a string', function () {
			expect(toUrl('github.com')).to.be.a('string');
		});
	});

	describe('truncate() method', function () {
		"use strict";

		it('should return a string', function () {
			expect(truncate('Est fidelis fuga', 10)).to.be.a('string');
		});

		it('should trucate the string if its longer than n', function () {
			expect(truncate('Est fidelis fuga', 10)).to.equal('Est fidel...');
		});

		it('should not truncate the string if its size is smaller than n', function () {
			expect(truncate('Est', 10)).to.equal('Est');
		});
	});

	describe('getUnique() method', function () {
		"use strict";

		var arr = [1, 3, 'a', 'a', 1, 5];
		it('should return an array', function () {
			expect(getUnique(arr)).to.be.a('Array');
		});

		it('should return an array of unique values', function () {
			expect(getUnique([1, 3, 'a', 'a', 1, 5])).to.eql([1, 3, 'a', 5]);
		});
	});

	describe('deepExtend() method', function () {
		"use strict";

		var defaults = {
			a: 1,
			b: 'hello',
			c: {
				d: 2,
				e: true
			}
		};

		var opts = {
			a: 3,
			c: {
				e: false
			}
		};

		var expected = {
			a: 3,
			b: 'hello',
			c: {
				d: 2,
				e: false
			}
		};

		it('should correctly extend the object', function () {
			expect(deepExtend(defaults, opts)).to.eql(expected);
		});

		it('should return an object', function () {
			expect(deepExtend(opts, defaults)).to.be.a('object');
		});
	});

	describe('escapeRegExp() method', function () {
		"use strict";

		var x = ':):/';
		it('should return a valid regex pattern', function () {
			var reg = new RegExp(escapeRegExp(x), 'g');
			expect(x).to.match(reg);
		});
	});

	describe('createText() method', function () {
		"use-strict";

		var str = 'This is embed.js';
		var embeds = [{
			index: 3,
			text: 'foo'
		}, {
			index: 1,
			text: 'bar'
		}, {
			index: 2,
			text: 'john'
		}];

		it('should return a string', function () {
			expect(createText(str, embeds)).to.be.a("string");
		});

		it('should return a string after concatenating the embeds in correct order', function () {
			expect(createText(str, embeds)).to.equal('This is embed.js bar john foo');
		});
	});

	describe('matches() method', function () {
		var regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
		var input = 'The documentation is available at http://someurl.jpg';
		var match = matches(regex, input);
		it('should return an object', function () {
			expect(match).to.be.a("array");
		});

		it('should return the location index of the matching substring', function () {
			expect(match.index).to.exist;
		});
	});

	describe('ifEmbed() method', function () {
		var options = {
			excludeEmbed: ["something"]
		};
		var service1 = "something";
		var service2 = "everything";

		it('should return true if the service is excluded', function () {
			expect(ifEmbed(options, 'everything')).to.be.true;
		});

		it('should return false if the service is not excluded', function () {
			expect(ifEmbed(options, 'something')).to.be.false;
		});
	});

	describe('getDimensions() method', function () {

		it('should return the height 450 if height is 600 and vice versa', function () {
			var options = {
				videoWidth: 600,
				videoHeight: null
			};

			var result = {
				height: 450,
				width: 600
			};

			expect(getDimensions(options)).to.eql(result);

			var options2 = {
				videoHeight: 450,
				videoWidth: null
			};

			expect(getDimensions(options2)).to.eql(result);
		});
	});

	describe('urlRegex() method', function () {
		it('should return a regex', function () {
			expect(urlRegex()).to.be.an.instanceof(RegExp);
		});

		it('should match url like http://rkritesh.com/embed.js', function () {
			expect('http://rkritesh.com/embed.js').to.match(urlRegex());
		});

		it('should match url like ftp://something.com', function () {
			expect('ftp://something.com').to.match(urlRegex());
		});
	});
});

var Url = function () {
	function Url(input, options) {
		babelHelpers_classCallCheck(this, Url);

		this.input = input;
		this.options = options;
		this.urlRegex = urlRegex();
	}

	babelHelpers_createClass(Url, [{
		key: 'process',
		value: function process() {
			var _this = this;

			var config = this.options.linkOptions;
			return this.input.replace(this.urlRegex, function (match) {
				var extension = match.split('.')[match.split('.').length - 1];
				if (config.exclude.indexOf(extension) === -1) {
					return ejs.template.url(match, _this.options) || '<a href="' + toUrl(match) + '" rel="' + config.rel + '" target="' + config.target + '">' + match + '</a>';
				}
				return match;
			});
		}
	}]);
	return Url;
}();

var expect$1 = chai.expect;

describe('Class Url unit test', function () {
	describe('should return a valid url', function () {

		var options = {
			link: true,
			linkOptions: {
				target: 'self',
				exclude: ['pdf'],
				rel: ''
			}
		};

		it('should return a valid anchor tag for http://xyz.com/abc', function () {
			var input = 'http://xyz.com/abc';
			var result = new Url(input, options).process();
			expect$1(result).to.be.a('string');
			expect$1(result).to.equal('<a href="http://xyz.com/abc" rel="" target="self">http://xyz.com/abc</a>');
		});

		it('should exclude the urls with excluded extensions', function () {
			var input = 'https://something.pdf http://a.jpg';
			var result = new Url(input, options).process();
			expect$1(result).to.be.a('string');
			expect$1(result).to.equal('https://something.pdf <a href="http://a.jpg" rel="" target="self">http://a.jpg</a>');
		});

		it('should support shortened urls like bit.ly/abc', function () {
			var input = 'bit.ly/abc';
			var url = new Url(input, options);
			var result = url.process();
			expect$1(result).to.be.a('string');
			expect$1(result).to.equal('<a href="//bit.ly/abc" rel="" target="self">bit.ly/abc</a>');
		});
	});
});

var Smiley = function () {
    function Smiley(input, options) {
        babelHelpers_classCallCheck(this, Smiley);

        this.input = ' ' + input + ' '; //hack to consider the first and last element

        var defaultIcons = [{
            'text': ' :) ',
            'code': '&#xe60a'
        }, {
            'text': ' :D ',
            'code': '&#xe608'
        }, {
            'text': ' :d ',
            'code': '&#xe608'
        }, {
            'text': ' :( ',
            'code': '&#xe60e'
        }, {
            'text': ' :/ ',
            'code': '&#xe620'

        }, {
            'text': ' :P ',
            'code': '&#xe60c'
        }, {
            'text': ' :p ',
            'code': '&#xe60c'
        }, {
            'text': ' 3:) ',
            'code': '&#xe618'
        }, {
            'text': ' (^) ',
            'code': '&#xe607'
        }, {
            'text': ' ;) ',
            'code': '&#xe610'
        }, {
            'text': ' :o ',
            'code': '&#xe61a'
        }, {
            'text': ' -_- ',
            'code': '&#xe61e'
        }, {
            'text': ' (y) ',
            'code': '&#xe606'
        }, {
            'text': ' :* ',
            'code': '&#xe604'
        }, {
            'text': ' &lt;3 ',
            'code': '&#xe604'
        }, {
            'text': ' <3 ',
            'code': '&#xe604'
        }, {
            'text': ' &lt;/3 ',
            'code': '&#xe605'
        }, {
            'text': ' </3 ',
            'code': '&#xe605'
        }, {
            'text': ' ^_^ ',
            'code': '&#xe612'
        }, {
            'text': ' 8-) ',
            'code': '&#xe614'
        }, {
            'text': ' 8| ',
            'code': '&#xe614'
        }, {
            'text': ' :S ',
            'code': '&#xe61c'
        }, {
            'text': ' :s ',
            'code': '&#xe61c'
        }];

        this.icons = options.customFontIcons.length ? options.customFontIcons : defaultIcons;

        this.EscapedSymbols = this.icons.map(function (val) {
            return '' + escapeRegExp(val.text);
        });

        this.smileyRegex = new RegExp('(' + this.EscapedSymbols.join('|') + ')', 'g');
    }

    babelHelpers_createClass(Smiley, [{
        key: 'process',
        value: function process() {
            var _this = this;

            var processedString = this.input.replace(this.smileyRegex, function (match, text) {
                var index = _this.EscapedSymbols.indexOf(escapeRegExp(text));
                var code = _this.icons[index].code;
                return ejs.template.smiley(text, code, _this.options) || ' <span class="icon-emoticon" title="' + text + '">' + code + '</span> ';
            });

            return processedString.substring(1, processedString.length - 1);
        }
    }]);
    return Smiley;
}();

var options = {
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
	beforeEmbedJSApply: function beforeEmbedJSApply() {},
	afterEmbedJSApply: function afterEmbedJSApply() {},
	onVideoShow: function onVideoShow() {},
	onTweetsLoad: function onTweetsLoad() {},
	videojsCallback: function videojsCallback() {},
	onOpenGraphFetch: function onOpenGraphFetch() {},
	onOpenGraphFail: function onOpenGraphFail() {},
	videoClickHandler: function videoClickHandler() {},
	served: [] //Private variable used to store processed urls so that they are not processed multiple times.
};

var expect$2 = chai.expect;

describe('Smiley Unit Test', function () {
	"use strict";

	var string = 'Hello :)';

	it('should return a string', function () {
		var smiley = new Smiley(string, options);
		expect$2(smiley.process()).to.be.a('string');
	});

	it('should insert a font smiley', function () {
		var smiley = new Smiley(string, options);
		expect$2(smiley.process()).to.equal('Hello <span class="icon-emoticon" title=" :) ">&#xe60a</span>');
	});
});

var Emoji = function () {
    function Emoji(output, options) {
        babelHelpers_classCallCheck(this, Emoji);

        this.output = output;
        this.options = options;

        this.emojiList = ['bowtie', 'smile', 'laughing', 'blush', 'smiley', 'relaxed', 'smirk', 'heart_eyes', 'kissing_heart', 'kissing_closed_eyes', 'flushed', 'relieved', 'satisfied', 'grin', 'wink', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'grinning', 'kissing', 'winky_face', 'kissing_smiling_eyes', 'stuck_out_tongue', 'sleeping', 'worried', 'frowning', 'anguished', 'open_mouth', 'grimacing', 'confused', 'hushed', 'expressionless', 'unamused', 'sweat_smile', 'sweat', 'wow', 'disappointed_relieved', 'weary', 'pensive', 'disappointed', 'confounded', 'fearful', 'cold_sweat', 'persevere', 'cry', 'sob', 'joy', 'astonished', 'scream', 'neckbeard', 'tired_face', 'angry', 'rage', 'triumph', 'sleepy', 'yum', 'mask', 'sunglasses', 'dizzy_face', 'imp', 'smiling_imp', 'neutral_face', 'no_mouth', 'innocent', 'alien', 'yellow_heart', 'blue_heart', 'purple_heart', 'heart', 'green_heart', 'broken_heart', 'heartbeat', 'heartpulse', 'two_hearts', 'revolving_hearts', 'cupid', 'sparkling_heart', 'sparkles', 'star', 'star2', 'dizzy', 'boom', 'collision', 'anger', 'exclamation', 'question', 'grey_exclamation', 'grey_question', 'zzz', 'dash', 'sweat_drops', 'notes', 'musical_note', 'fire', 'hankey', 'poop', 'shit', '\\+1', 'thumbsup', '-1', 'thumbsdown', 'ok_hand', 'punch', 'facepunch', 'fist', 'v', 'wave', 'hand', 'raised_hand', 'open_hands', 'point_up', 'point_down', 'point_left', 'point_right', 'raised_hands', 'pray', 'point_up_2', 'clap', 'muscle', 'metal', 'fu', 'walking', 'runner', 'running', 'couple', 'family', 'two_men_holding_hands', 'two_women_holding_hands', 'dancer', 'dancers', 'ok_woman', 'no_good', 'information_desk_person', 'raising_hand', 'bride_with_veil', 'person_with_pouting_face', 'person_frowning', 'bow', 'couplekiss', 'couple_with_heart', 'massage', 'haircut', 'nail_care', 'boy', 'girl', 'woman', 'man', 'baby', 'older_woman', 'older_man', 'person_with_blond_hair', 'man_with_gua_pi_mao', 'man_with_turban', 'construction_worker', 'cop', 'angel', 'princess', 'smiley_cat', 'smile_cat', 'heart_eyes_cat', 'kissing_cat', 'smirk_cat', 'scream_cat', 'crying_cat_face', 'joy_cat', 'pouting_cat', 'japanese_ogre', 'japanese_goblin', 'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'guardsman', 'skull', 'feet', 'lips', 'kiss', 'droplet', 'ear', 'eyes', 'nose', 'tongue', 'love_letter', 'bust_in_silhouette', 'busts_in_silhouette', 'speech_balloon', 'thought_balloon', 'feelsgood', 'finnadie', 'goberserk', 'godmode', 'hurtrealbad', 'rage1', 'rage2', 'rage3', 'rage4', 'suspect', 'trollface', 'sunny', 'umbrella', 'cloud', 'snowflake', 'snowman', 'zap', 'cyclone', 'foggy', 'ocean', 'cat', 'dog', 'mouse', 'hamster', 'rabbit', 'wolf', 'frog', 'tiger', 'koala', 'bear', 'pig', 'pig_nose', 'cow', 'boar', 'monkey_face', 'monkey', 'horse', 'racehorse', 'camel', 'sheep', 'elephant', 'panda_face', 'snake', 'bird', 'baby_chick', 'hatched_chick', 'hatching_chick', 'chicken', 'penguin', 'turtle', 'bug', 'honeybee', 'ant', 'beetle', 'snail', 'octopus', 'tropical_fish', 'fish', 'whale', 'whale2', 'dolphin', 'cow2', 'ram', 'rat', 'water_buffalo', 'tiger2', 'rabbit2', 'dragon', 'goat', 'rooster', 'dog2', 'pig2', 'mouse2', 'ox', 'dragon_face', 'blowfish', 'crocodile', 'dromedary_camel', 'leopard', 'cat2', 'poodle', 'paw_prints', 'bouquet', 'cherry_blossom', 'tulip', 'four_leaf_clover', 'rose', 'sunflower', 'hibiscus', 'maple_leaf', 'leaves', 'fallen_leaf', 'herb', 'mushroom', 'cactus', 'palm_tree', 'evergreen_tree', 'deciduous_tree', 'chestnut', 'seedling', 'blossom', 'ear_of_rice', 'shell', 'globe_with_meridians', 'sun_with_face', 'full_moon_with_face', 'new_moon_with_face', 'new_moon', 'waxing_crescent_moon', 'first_quarter_moon', 'waxing_gibbous_moon', 'full_moon', 'waning_gibbous_moon', 'last_quarter_moon', 'waning_crescent_moon', 'last_quarter_moon_with_face', 'first_quarter_moon_with_face', 'moon', 'earth_africa', 'earth_americas', 'earth_asia', 'volcano', 'milky_way', 'partly_sunny', 'octocat', 'squirrel', 'bamboo', 'gift_heart', 'dolls', 'school_satchel', 'mortar_board', 'flags', 'fireworks', 'sparkler', 'wind_chime', 'rice_scene', 'jack_o_lantern', 'ghost', 'santa', 'christmas_tree', 'gift', 'bell', 'no_bell', 'tanabata_tree', 'tada', 'confetti_ball', 'balloon', 'crystal_ball', 'cd', 'dvd', 'floppy_disk', 'camera', 'video_camera', 'movie_camera', 'computer', 'tv', 'iphone', 'phone', 'telephone', 'telephone_receiver', 'pager', 'fax', 'minidisc', 'vhs', 'sound', 'speaker', 'mute', 'loudspeaker', 'mega', 'hourglass', 'hourglass_flowing_sand', 'alarm_clock', 'watch', 'radio', 'satellite', 'loop', 'mag', 'mag_right', 'unlock', 'lock', 'lock_with_ink_pen', 'closed_lock_with_key', 'key', 'bulb', 'flashlight', 'high_brightness', 'low_brightness', 'electric_plug', 'battery', 'calling', 'email', 'mailbox', 'postbox', 'bath', 'bathtub', 'shower', 'toilet', 'wrench', 'nut_and_bolt', 'hammer', 'seat', 'moneybag', 'yen', 'dollar', 'pound', 'euro', 'credit_card', 'money_with_wings', 'e-mail', 'inbox_tray', 'outbox_tray', 'envelope', 'incoming_envelope', 'postal_horn', 'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'door', 'smoking', 'bomb', 'gun', 'hocho', 'pill', 'syringe', 'page_facing_up', 'page_with_curl', 'bookmark_tabs', 'bar_chart', 'chart_with_upwards_trend', 'chart_with_downwards_trend', 'scroll', 'clipboard', 'calendar', 'date', 'card_index', 'file_folder', 'open_file_folder', 'scissors', 'pushpin', 'paperclip', 'black_nib', 'pencil2', 'straight_ruler', 'triangular_ruler', 'closed_book', 'green_book', 'blue_book', 'orange_book', 'notebook', 'notebook_with_decorative_cover', 'ledger', 'books', 'bookmark', 'name_badge', 'microscope', 'telescope', 'newspaper', 'football', 'basketball', 'soccer', 'baseball', 'tennis', '8ball', 'rugby_football', 'bowling', 'golf', 'mountain_bicyclist', 'bicyclist', 'horse_racing', 'snowboarder', 'swimmer', 'surfer', 'ski', 'spades', 'hearts', 'clubs', 'diamonds', 'gem', 'ring', 'trophy', 'musical_score', 'musical_keyboard', 'violin', 'space_invader', 'video_game', 'black_joker', 'flower_playing_cards', 'game_die', 'dart', 'mahjong', 'clapper', 'memo', 'pencil', 'book', 'art', 'microphone', 'headphones', 'trumpet', 'saxophone', 'guitar', 'shoe', 'sandal', 'high_heel', 'lipstick', 'boot', 'shirt', 'tshirt', 'necktie', 'womans_clothes', 'dress', 'running_shirt_with_sash', 'jeans', 'kimono', 'bikini', 'ribbon', 'tophat', 'crown', 'womans_hat', 'mans_shoe', 'closed_umbrella', 'briefcase', 'handbag', 'pouch', 'purse', 'eyeglasses', 'fishing_pole_and_fish', 'coffee', 'tea', 'sake', 'baby_bottle', 'beer', 'beers', 'cocktail', 'tropical_drink', 'wine_glass', 'fork_and_knife', 'pizza', 'hamburger', 'fries', 'poultry_leg', 'meat_on_bone', 'spaghetti', 'curry', 'fried_shrimp', 'bento', 'sushi', 'fish_cake', 'rice_ball', 'rice_cracker', 'rice', 'ramen', 'stew', 'oden', 'dango', 'egg', 'bread', 'doughnut', 'custard', 'icecream', 'ice_cream', 'shaved_ice', 'birthday', 'cake', 'cookie', 'chocolate_bar', 'candy', 'lollipop', 'honey_pot', 'apple', 'green_apple', 'tangerine', 'lemon', 'cherries', 'grapes', 'watermelon', 'strawberry', 'peach', 'melon', 'banana', 'pear', 'pineapple', 'sweet_potato', 'eggplant', 'tomato', 'corn', 'house', 'house_with_garden', 'school', 'office', 'post_office', 'hospital', 'bank', 'convenience_store', 'love_hotel', 'hotel', 'wedding', 'church', 'department_store', 'european_post_office', 'city_sunrise', 'city_sunset', 'japanese_castle', 'european_castle', 'tent', 'factory', 'tokyo_tower', 'japan', 'mount_fuji', 'sunrise_over_mountains', 'sunrise', 'stars', 'themoreyouknow', 'tmyk', 'statue_of_liberty', 'bridge_at_night', 'carousel_horse', 'rainbow', 'ferris_wheel', 'fountain', 'roller_coaster', 'ship', 'speedboat', 'boat', 'sailboat', 'rowboat', 'anchor', 'rocket', 'airplane', 'helicopter', 'steam_locomotive', 'tram', 'mountain_railway', 'bike', 'aerial_tramway', 'suspension_railway', 'mountain_cableway', 'tractor', 'blue_car', 'oncoming_automobile', 'car', 'red_car', 'taxi', 'oncoming_taxi', 'articulated_lorry', 'bus', 'oncoming_bus', 'rotating_light', 'police_car', 'oncoming_police_car', 'fire_engine', 'ambulance', 'minibus', 'truck', 'train', 'station', 'train2', 'bullettrain_front', 'bullettrain_side', 'light_rail', 'monorail', 'railway_car', 'trolleybus', 'ticket', 'fuelpump', 'vertical_traffic_light', 'traffic_light', 'warning', 'construction', 'beginner', 'atm', 'slot_machine', 'busstop', 'barber', 'hotsprings', 'checkered_flag', 'crossed_flags', 'izakaya_lantern', 'moyai', 'circus_tent', 'performing_arts', 'round_pushpin', 'triangular_flag_on_post', 'jp', 'kr', 'cn', 'us', 'fr', 'es', 'it', 'ru', 'gb', 'uk', 'de', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'keycap_ten', '1234', 'zero', 'hash', 'symbols', 'arrow_backward', 'arrow_down', 'arrow_forward', 'arrow_left', 'capital_abcd', 'abcd', 'abc', 'arrow_lower_left', 'arrow_lower_right', 'arrow_right', 'arrow_up', 'arrow_upper_left', 'arrow_upper_right', 'arrow_double_down', 'arrow_double_up', 'arrow_down_small', 'arrow_heading_down', 'arrow_heading_up', 'leftwards_arrow_with_hook', 'arrow_right_hook', 'left_right_arrow', 'arrow_up_down', 'arrow_up_small', 'arrows_clockwise', 'arrows_counterclockwise', 'rewind', 'fast_forward', 'information_source', 'ok', 'twisted_rightwards_arrows', 'repeat', 'repeat_one', 'new', 'top', 'up', 'cool', 'free', 'ng', 'cinema', 'koko', 'signal_strength', 'u5272', 'u5408', 'u55b6', 'u6307', 'u6708', 'u6709', 'u6e80', 'u7121', 'u7533', 'u7a7a', 'u7981', 'sa', 'restroom', 'mens', 'womens', 'baby_symbol', 'no_smoking', 'parking', 'wheelchair', 'metro', 'baggage_claim', 'accept', 'wc', 'potable_water', 'put_litter_in_its_place', 'secret', 'congratulations', 'm', 'passport_control', 'left_luggage', 'customs', 'ideograph_advantage', 'cl', 'sos', 'id', 'no_entry_sign', 'underage', 'no_mobile_phones', 'do_not_litter', 'non-potable_water', 'no_bicycles', 'no_pedestrians', 'children_crossing', 'no_entry', 'eight_spoked_asterisk', 'eight_pointed_black_star', 'heart_decoration', 'vs', 'vibration_mode', 'mobile_phone_off', 'chart', 'currency_exchange', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'ophiuchus', 'six_pointed_star', 'negative_squared_cross_mark', 'a', 'b', 'ab', 'o2', 'diamond_shape_with_a_dot_inside', 'recycle', 'end', 'on', 'soon', 'clock1', 'clock130', 'clock10', 'clock1030', 'clock11', 'clock1130', 'clock12', 'clock1230', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4', 'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7', 'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'heavy_dollar_sign', 'copyright', 'registered', 'tm', 'x', 'heavy_exclamation_mark', 'bangbang', 'interrobang', 'o', 'heavy_multiplication_x', 'heavy_plus_sign', 'heavy_minus_sign', 'heavy_division_sign', 'white_flower', '100', 'heavy_check_mark', 'ballot_box_with_check', 'radio_button', 'link', 'curly_loop', 'wavy_dash', 'part_alternation_mark', 'trident', 'black_square', 'white_square', 'white_check_mark', 'black_square_button', 'white_square_button', 'black_circle', 'white_circle', 'red_circle', 'large_blue_circle', 'large_blue_diamond', 'large_orange_diamond', 'small_blue_diamond', 'small_orange_diamond', 'small_red_triangle', 'small_red_triangle_down', 'shipit'];

        this.allEmojiList = this.emojiList.concat(this.options.customEmoji);

        this.emojiRegex = new RegExp(':(' + this.allEmojiList.join('|') + '):', 'g');
    }

    babelHelpers_createClass(Emoji, [{
        key: 'process',
        value: function process() {
            var _this = this;

            return this.output.replace(this.emojiRegex, function (match, text) {
                return ejs.template.emoji(text, _this.options) || '<span class="emoticon emoticon-' + text + '" title=":' + text + ':"></span>';
            });
        }
    }]);
    return Emoji;
}();

var expect$3 = chai.expect;

describe('Emoji Unit test', function () {
	var string = 'I am happy :smile:';
	var string2 = 'I am happy :smile: :+1:';

	describe('should pass all tests', function () {
		it('should return a string', function () {
			var emoji = new Emoji(string, options);
			expect$3(emoji.process()).to.be.a('string');
		});

		it('should convert a emoji text into emoji', function () {
			var emoji = new Emoji(string, options);
			var emoji2 = new Emoji(string2, options);
			expect$3(emoji.process()).to.equal('I am happy <span class="emoticon emoticon-smile" title=":smile:"></span>');
			expect$3(emoji2.process()).to.equal('I am happy <span class="emoticon emoticon-smile" title=":smile:"></span> <span class="emoticon emoticon-+1" title=":+1:"></span>');
		});
	});
});

var Base = function () {
	function Base(input, output, options, embeds) {
		babelHelpers_classCallCheck(this, Base);

		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
	}

	babelHelpers_createClass(Base, [{
		key: 'process',
		value: function process() {
			var _this = this;

			if (!ifInline(this.options, this.service)) {
				var regexInline = this.options.link ? new RegExp('([^>]*' + this.regex.source + ')</a>', 'gm') : new RegExp('([^\\s]*' + this.regex.source + ')', 'gm');
				this.output = this.output.replace(regexInline, function (match) {
					var url = _this.options.link ? match.slice(0, -4) : match;
					if (_this.options.served.indexOf(url) === -1) {
						_this.options.served.push(url);
						if (_this.options.link) {
							return !_this.options.inlineText ? _this.template(match.slice(0, -4)) + '</a>' : match + _this.template(match.slice(0, -4));
						} else {
							return !_this.options.inlineText ? _this.template(match) : match + _this.template(match);
						}
					} else {
						return url;
					}
				});
			} else {
				var match = undefined;
				while ((match = matches(this.regex, this.input)) !== null) {
					if (!(this.options.served.indexOf(match[0]) === -1)) continue;
					var text = this.template(match[0]);
					this.embeds.push({
						text: text,
						index: match.index
					});
				}
			}
			return [this.output, this.embeds];
		}
	}]);
	return Base;
}();

var Plunker = function (_Base) {
    babelHelpers_inherits(Plunker, _Base);

    function Plunker(input, output, options, embeds) {
        babelHelpers_classCallCheck(this, Plunker);

        var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(Plunker).call(this, input, output, options, embeds));

        _this.regex = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
        _this.service = 'plunker';
        return _this;
    }

    babelHelpers_createClass(Plunker, [{
        key: 'template',
        value: function template(match) {
            var a = match.split('?')[0].split('/');
            var id = a[a.length - 1];
            return ejs.template.plunker(id, this.options) || '<div class="ejs-embed ejs-plunker">\n\t\t<iframe class="ne-plunker" src="http://embed.plnkr.co/' + id + '" height="' + this.options.codeEmbedHeight + '"></iframe>\n\t\t</div>';
        }
    }]);
    return Plunker;
}(Base);

var expect$4 = chai.expect;

describe('Class Plunker => unit test', function () {
	it('should return a valid plunked embedding url', function () {

		var output = undefined;
		var embeds = [];
		var input = output = 'Sunt castores desiderium https://plnkr.co/edit/nVCmukG5abpi1Y4ZHkrq?p=preview grandis, pius zetaes.Cur luna persuadere?';
		var plunker = new Plunker(input, output, options, embeds);

		var _plunker$process = plunker.process();

		var _plunker$process2 = babelHelpers_slicedToArray(_plunker$process, 2);

		output = _plunker$process2[0];
		embeds = _plunker$process2[1];

		expect$4(output).to.be.a('string');
		expect$4(embeds).to.be.a('array');

		expect$4(embeds[0].index).to.equal(33);

		expect$4(embeds[0].text.replace(/\t|\n/gi, '')).to.equal('<div class="ejs-embed ejs-plunker"><iframe class="ne-plunker" src="http://embed.plnkr.co/nVCmukG5abpi1Y4ZHkrq" height="500"></iframe></div>');
	});
});

var CodePen = function (_Base) {
    babelHelpers_inherits(CodePen, _Base);

    function CodePen(input, output, options, embeds) {
        babelHelpers_classCallCheck(this, CodePen);

        var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(CodePen).call(this, input, output, options, embeds));

        _this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
        _this.service = 'codepen';
        return _this;
    }

    babelHelpers_createClass(CodePen, [{
        key: 'template',
        value: function template(id) {
            return ejs.template.codePen(id, this.options) || '<div class="ejs-embed ejs-codepen">\n\t\t\t<iframe scrolling="no" height="' + this.options.codeEmbedHeight + '" src="' + id.replace(/\/pen\//, '/embed/') + '/?height=' + this.options.codeEmbedHeight + '"></iframe>\n\t\t</div>';
        }
    }]);
    return CodePen;
}(Base);

var expect$5 = chai.expect;

describe('Class Codepen => unit test', function () {
	it('should return a valid plunked embedding url', function () {

		var output = undefined;
		var embeds = [];
		var input = output = 'Sunt castores desiderium http://codepen.io/enxaneta/pen/meYEzO#0 grandis, pius zetaes.Cur luna persuadere?';
		var codepen = new CodePen(input, output, options, embeds);

		var _codepen$process = codepen.process();

		var _codepen$process2 = babelHelpers_slicedToArray(_codepen$process, 2);

		output = _codepen$process2[0];
		embeds = _codepen$process2[1];

		expect$5(output).to.be.a('string');
		expect$5(embeds).to.be.a('array');

		expect$5(embeds[0].text.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/enxaneta/embed/meYEzO/?height=500"></iframe></div>');
	});
});

var Ideone = function (_Base) {
    babelHelpers_inherits(Ideone, _Base);

    function Ideone(input, output, options, embeds) {
        babelHelpers_classCallCheck(this, Ideone);

        var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(Ideone).call(this, input, output, options, embeds));

        _this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
        _this.service = 'ideone';
        return _this;
    }

    babelHelpers_createClass(Ideone, [{
        key: 'template',
        value: function template(match) {
            return ejs.template.ideone(match, this.options) || '<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/' + match.split('/')[1] + '" frameborder="0" height="' + this.options.codeEmbedHeight + '"></iframe></div>';
        }
    }]);
    return Ideone;
}(Base);

var expect$6 = chai.expect;

describe('Class Ideone => unit test', function () {
	describe('test with single matching', function () {

		describe('normal embedding', function () {

			var output = undefined;
			var embeds = [];
			var input = output = 'Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?';
			var ideone = new Ideone(input, output, options, embeds);

			var _ideone$process = ideone.process();

			var _ideone$process2 = babelHelpers_slicedToArray(_ideone$process, 2);

			output = _ideone$process2[0];
			embeds = _ideone$process2[1];

			it('should return a valid plunked embedding url', function () {

				expect$6(output).to.be.a('string');
				expect$6(embeds).to.be.a('array');

				expect$6(embeds[0].text.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/HH8rmZ" frameborder="0" height="500"></iframe></div>');
			});
		});

		describe('inline embedding', function () {
			it('should return correct result for inline embedding with url embed enabled', function () {
				var output = undefined;
				var embeds = [];
				var opts = cloneObject(options);
				opts.inlineEmbed = 'all';

				var input = 'Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?';
				output = new Url(input, opts).process();
				var ideone = new Ideone(input, output, opts, embeds);

				var _ideone$process3 = ideone.process();

				var _ideone$process4 = babelHelpers_slicedToArray(_ideone$process3, 2);

				output = _ideone$process4[0];
				embeds = _ideone$process4[1];

				expect$6(embeds).to.be.empty;
				expect$6(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self">http://ideone.com/HH8rmZ</a><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?');
			});

			it('should return correct result for inline embedding with url embed disabled', function () {
				var output = undefined;
				var embeds = [];
				var opts = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link = false;

				var input = output = 'Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?';
				var ideone = new Ideone(input, output, opts, embeds);

				var _ideone$process5 = ideone.process();

				var _ideone$process6 = babelHelpers_slicedToArray(_ideone$process5, 2);

				output = _ideone$process6[0];
				embeds = _ideone$process6[1];

				expect$6(embeds).to.be.empty;
				expect$6(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium http://ideone.com/HH8rmZ<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?');
			});

			it('should return correct result for inline embedding with inlineText and link disabled', function () {
				var output = undefined;
				var embeds = [];
				var opts = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link = false;
				opts.inlineText = false;

				var input = output = 'Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?';
				var ideone = new Ideone(input, output, opts, embeds);

				var _ideone$process7 = ideone.process();

				var _ideone$process8 = babelHelpers_slicedToArray(_ideone$process7, 2);

				output = _ideone$process8[0];
				embeds = _ideone$process8[1];

				expect$6(embeds).to.be.empty;
				expect$6(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?');
			});

			it('should return correct result for inline embedding with inlineText disabled and link enabled', function () {
				var output = undefined;
				var embeds = [];
				var opts = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link = true;
				opts.inlineText = false;

				var input = 'Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?';

				output = new Url(input, opts).process();

				var ideone = new Ideone(input, output, opts, embeds);

				var _ideone$process9 = ideone.process();

				var _ideone$process10 = babelHelpers_slicedToArray(_ideone$process9, 2);

				output = _ideone$process10[0];
				embeds = _ideone$process10[1];

				expect$6(embeds).to.be.empty;
				expect$6(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self"><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div></a> grandis, pius zetaes.Cur luna persuadere?');
			});
		});
	});

	describe('test with multiple matching', function () {

		it('should return correct results for multiple embeds', function () {

			var output = undefined;
			var embeds = [];
			var input = output = 'Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?';
			var ideone = new Ideone(input, output, options, embeds);

			var _ideone$process11 = ideone.process();

			var _ideone$process12 = babelHelpers_slicedToArray(_ideone$process11, 2);

			output = _ideone$process12[0];
			embeds = _ideone$process12[1];

			expect$6(embeds).to.have.length(2);
			expect$6(output).to.not.be.undefined;
		});
	});
});