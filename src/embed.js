/*
 * embed-js - v3.7.4
 * A JavaScript plugin that analyses the string and embeds emojis, media, tweets, code and services.
 * http://riteshkr.com/embed.js
 *
 *   Made by Ritesh Kumar
 *   Under MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.EmbedJS = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
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

  babelHelpers.inherits = function (subClass, superClass) {
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

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.slicedToArray = function () {
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

  babelHelpers;

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
   * @param  {string} str    String to which the created text has to be added
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
   * Checks whether a particular service should be embedded or not based on
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
  function setDimensions(options) {
      options.videoWidth = options.videoWidth || options.videoHeight / 3 * 4 || 800;
      options.videoHeight = options.videoHeight || options.videoWidth / 4 * 3 || 600;
      return options;
  }

  /**
   * Returns a cloned object
   * @param  {object} obj
   * @return {object}     cloned object
   */
  function cloneObject(obj) {
      if (obj === null || (typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj)) !== 'object') return obj;
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

  function arrayLowercase(options, property) {
      if (typeof options[property] !== 'string') {
          options[property] = options[property].map(function (elem) {
              return elem.toLowerCase();
          });
      }
      return options;
  }

  /**
   * Sets the dimensions and converts options values' Array into lowercase.
   * @param options
   * @returns {Object|*}
   */
  function processOptions(options) {
      options = setDimensions(options);
      options = arrayLowercase(options, 'excludeEmbed');
      options = arrayLowercase(options, 'inlineEmbed');
      return arrayLowercase(options, 'openGraphExclude');
  }

  /**
   * Get the last element of an array or string
   * @param elem [String|Array]
   * @returns last element of the Array or String
   */
  function lastElement(elem) {
      return elem[elem.length - 1];
  }

  var Renderer = function () {
  	function Renderer(options) {
  		babelHelpers.classCallCheck(this, Renderer);

  		this.options = options || {};
  	}

  	babelHelpers.createClass(Renderer, [{
  		key: 'url',
  		value: function url(match, options) {
  			var config = options.linkOptions;
  			return '<a href="' + toUrl(match) + '" rel="' + config.rel + '" target="' + config.target + '">' + match + '</a>';
  		}
  	}, {
  		key: 'smiley',
  		value: function smiley(text, code) {
  			return ' <span class="icon-emoticon" title="' + text + '">' + code + '</span> ';
  		}
  	}, {
  		key: 'emoji',
  		value: function emoji(text) {
  			return '<span class="emoticon emoticon-' + text + '" title=":' + text + ':"></span>';
  		}
  	}, {
  		key: 'basicAudio',
  		value: function basicAudio(match) {
  			return '<div class="ejs-audio ejs-embed"><audio src="' + match + '" controls class="video-js ejs-video-js"></audio></div>';
  		}
  	}, {
  		key: 'soundCloud',
  		value: function soundCloud(match, options) {
  			var config = options.soundCloudOptions;
  			return '<div class="ejs-embed">\n\t\t<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=' + match + '\n\t\t&auto_play     = ' + config.autoPlay + '\n\t\t&hide_related  = ' + config.hideRelated + '\n\t\t&show_comments = ' + config.showComments + '\n\t\t&show_user     = ' + config.showUser + '\n\t\t&show_reposts  = ' + config.showReposts + '\n\t\t&visual        = ' + config.visual + '\n\t\t&download      = ' + config.download + '\n\t\t&color         = ' + config.themeColor + '\n\t\t&theme_color   = ' + config.themeColor + '"></iframe>\n\t\t</div>';
  		}
  	}, {
  		key: 'spotify',
  		value: function spotify(id) {
  			return '<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:' + id + '" height="80"></iframe></div>';
  		}
  	}, {
  		key: 'codePen',
  		value: function codePen(id, options) {
  			return '<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="' + options.codeEmbedHeight + '" src="' + id.replace(/\/pen\//, '/embed/') + '/?height=' + options.codeEmbedHeight + '"></iframe></div>';
  		}
  	}, {
  		key: 'ideone',
  		value: function ideone(match, options) {
  			return '<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/' + match.split('/')[1] + '" frameborder="0" height="' + options.codeEmbedHeight + '"></iframe></div>';
  		}
  	}, {
  		key: 'jsBin',
  		value: function jsBin(id, options) {
  			return '<div class="ejs-jsbin ejs-embed"><iframe height="' + options.codeEmbedHeight + '" class="jsbin-embed foo" src="http://' + id + '/embed?html,js,output"></iframe></div>';
  		}
  	}, {
  		key: 'jsFiddle',
  		value: function jsFiddle(id, options) {
  			return '<div class="ejs-embed ejs-jsfiddle"><iframe height="' + options.codeEmbedHeight + '" src="' + id + '/embedded"></iframe></div>';
  		}
  	}, {
  		key: 'plunker',
  		value: function plunker(id, options) {
  			return '<div class="ejs-embed ejs-plunker"><iframe class="ne-plunker" src="http://embed.plnkr.co/' + id + '" height="' + options.codeEmbedHeight + '"></iframe></div>';
  		}
  	}, {
  		key: 'basicImage',
  		value: function basicImage(match) {
  			return '<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="' + match + '"/></div></div>';
  		}
  	}, {
  		key: 'flickr',
  		value: function flickr(match, options) {
  			return '<div class="ejs-embed"><div class="ne-image-wrapper"><iframe src="' + toUrl(match.split('/?')[0]) + '/player/" width="' + options.videoWidth + '" height="' + options.videoHeight + '"></iframe></div></div>';
  		}
  	}, {
  		key: 'instagram',
  		value: function instagram(match, options) {
  			return '<div class="ejs-embed ejs-instagram"><iframe src="' + toUrl(match.split('/?')[0]) + '/embed/" height="' + options.videoHeight + '"></iframe></div>';
  		}
  	}, {
  		key: 'slideShare',
  		value: function slideShare(html) {
  			return '<div class="ejs-embed ejs-slideshare">' + html + '</div>';
  		}
  	}, {
  		key: 'basicVideo',
  		value: function basicVideo(match) {
  			return '<div class="ejs-video ejs-embed"><div class="ejs-video-player"><div class="ejs-player"><video src="' + match + '" class="ejs-video-js video-js" controls></video></div></div></div>';
  		}
  	}, {
  		key: 'dailymotion',
  		value: function dailymotion(id, options) {
  			return '<div class="ejs-video ejs-embed"><iframe src="http://www.dailymotion.com/embed/video/' + id + '" height="' + options.videoHeight + '" width="' + options.videoWidth + '"></iframe></div>';
  		}
  	}, {
  		key: 'liveleak',
  		value: function liveleak(match, options) {
  			return '<div class="ejs-video ejs-embed"><iframe src="http://www.liveleak.com/e/' + match.split('=')[1] + '" height="' + options.videoHeight + '" width="' + options.videoWidth + '"></iframe></div>';
  		}
  	}, {
  		key: 'ted',
  		value: function ted(id, options) {
  			return '<div class="ejs-embed ejs-ted"><iframe src="http://embed.ted.com/talks/' + id + '.html" height="' + options.videoHeight + '" width="' + options.videoWidth + '"></iframe></div>';
  		}
  	}, {
  		key: 'ustream',
  		value: function ustream(id, options) {
  			return '<div class="ejs-embed ejs-ustream"><iframe src="//www.' + id.join('/') + '" height="' + options.videoHeight + '" width="' + options.videoWidth + '"></iframe></div>';
  		}
  	}, {
  		key: 'detailsVimeo',
  		value: function detailsVimeo(data, fullData, embedUrl) {
  			return '<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="' + embedUrl + '"><div class="ejs-thumb" style="background-image:url(' + data.thumbnail + ')"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="' + data.url + '">' + data.title + '</a></div><div class="ejs-video-desc">' + data.description + '</div><div class="ejs-video-stats"><span><i class="fa fa-eye"></i>' + data.views + '</span><span><i class="fa fa-heart"></i>' + data.likes + '</span></div></div></div></div>';
  		}
  	}, {
  		key: 'detailsYoutube',
  		value: function detailsYoutube(data, fullData, embedUrl) {
  			return '<div class="ejs-video ejs-embed"><div class="ejs-video-preview"><div class="ejs-video-thumb" data-ejs-url="' + embedUrl + '"><div class="ejs-thumb" style="background-image:url(' + data.thumbnail + ')"></div><i class="fa fa-play-circle-o"></i></div><div class="ejs-video-detail"><div class="ejs-video-title"><a href="' + data.url + '">' + data.title + '</a></div><div class="ejs-video-desc">' + data.description + '</div><div class="ejs-video-stats"><span><i class="fa fa-eye"></i>' + data.views + '</span><span><i class="fa fa-heart"></i>' + data.likes + '</span></div></div></div></div>';
  		}
  	}, {
  		key: 'vine',
  		value: function vine(id, options) {
  			var config = options.vineOptions;
  			return '<div class="ejs-vine"><iframe class="ejs-vine-iframe" src="https://vine.co/v/' + id + '/embed/' + config.type + '" height="' + config.height + '" width="' + config.width + '"></iframe></div>';
  		}
  	}, {
  		key: 'vimeo',
  		value: function vimeo(url, options) {
  			return '<div class="ejs-video-player ejs-embed"><iframe src="' + url + '" frameBorder="0" width="' + options.videoWidth + '" height="' + options.videoHeight + '"></iframe></div>';
  		}
  	}, {
  		key: 'youtube',
  		value: function youtube(url, options) {
  			return '<div class="ejs-video-player ejs-embed"><iframe src="' + url + '" frameBorder="0" width="' + options.videoWidth + '" height="' + options.videoHeight + '"></iframe></div>';
  		}
  	}, {
  		key: 'openGraph',
  		value: function openGraph(data, options) {
  			return '<div class="ejs-embed ejs-ogp"><div class="ejs-ogp-thumb" style="background-image:url(' + data.image + ')"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="' + data.url + '" target="' + options.linkOptions.target + '">' + data.title + '</a></div><div class="ejs-ogb-details">' + data.description + '</div></div></div>';
  		}
  	}, {
  		key: 'github',
  		value: function github(data, options) {
  			return '<div class="ejs-embed ejs-github"><div class="ejs-ogp-thumb" style="background-image:url(' + data.owner.avatar_url + ')"></div><div class="ejs-ogp-details"><div class="ejs-ogp-title"><a href="' + data.html_url + '" target="' + options.linkOptions.target + '">' + data.full_name + '</a></div><div class="ejs-ogb-details">' + data.description + '</div><div class="ejs-github-stats"><span><i class="fa fa-star"></i>' + data.stargazers_count + '</span><span><i class="fa fa-code-fork"></i>' + data.network_count + '</span></div></div></div>';
  		}
  	}]);
  	return Renderer;
  }();

  var Emoji = function () {
      function Emoji(output, options) {
          babelHelpers.classCallCheck(this, Emoji);

          this.output = output;
          this.options = options;

          this.emojiList = ['bowtie', 'smile', 'laughing', 'blush', 'smiley', 'relaxed', 'smirk', 'heart_eyes', 'kissing_heart', 'kissing_closed_eyes', 'flushed', 'relieved', 'satisfied', 'grin', 'wink', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'grinning', 'kissing', 'winky_face', 'kissing_smiling_eyes', 'stuck_out_tongue', 'sleeping', 'worried', 'frowning', 'anguished', 'open_mouth', 'grimacing', 'confused', 'hushed', 'expressionless', 'unamused', 'sweat_smile', 'sweat', 'wow', 'disappointed_relieved', 'weary', 'pensive', 'disappointed', 'confounded', 'fearful', 'cold_sweat', 'persevere', 'cry', 'sob', 'joy', 'astonished', 'scream', 'neckbeard', 'tired_face', 'angry', 'rage', 'triumph', 'sleepy', 'yum', 'mask', 'sunglasses', 'dizzy_face', 'imp', 'smiling_imp', 'neutral_face', 'no_mouth', 'innocent', 'alien', 'yellow_heart', 'blue_heart', 'purple_heart', 'heart', 'green_heart', 'broken_heart', 'heartbeat', 'heartpulse', 'two_hearts', 'revolving_hearts', 'cupid', 'sparkling_heart', 'sparkles', 'star', 'star2', 'dizzy', 'boom', 'collision', 'anger', 'exclamation', 'question', 'grey_exclamation', 'grey_question', 'zzz', 'dash', 'sweat_drops', 'notes', 'musical_note', 'fire', 'hankey', 'poop', 'shit', '\\+1', 'thumbsup', '-1', 'thumbsdown', 'ok_hand', 'punch', 'facepunch', 'fist', 'v', 'wave', 'hand', 'raised_hand', 'open_hands', 'point_up', 'point_down', 'point_left', 'point_right', 'raised_hands', 'pray', 'point_up_2', 'clap', 'muscle', 'metal', 'fu', 'walking', 'runner', 'running', 'couple', 'family', 'two_men_holding_hands', 'two_women_holding_hands', 'dancer', 'dancers', 'ok_woman', 'no_good', 'information_desk_person', 'raising_hand', 'bride_with_veil', 'person_with_pouting_face', 'person_frowning', 'bow', 'couplekiss', 'couple_with_heart', 'massage', 'haircut', 'nail_care', 'boy', 'girl', 'woman', 'man', 'baby', 'older_woman', 'older_man', 'person_with_blond_hair', 'man_with_gua_pi_mao', 'man_with_turban', 'construction_worker', 'cop', 'angel', 'princess', 'smiley_cat', 'smile_cat', 'heart_eyes_cat', 'kissing_cat', 'smirk_cat', 'scream_cat', 'crying_cat_face', 'joy_cat', 'pouting_cat', 'japanese_ogre', 'japanese_goblin', 'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'guardsman', 'skull', 'feet', 'lips', 'kiss', 'droplet', 'ear', 'eyes', 'nose', 'tongue', 'love_letter', 'bust_in_silhouette', 'busts_in_silhouette', 'speech_balloon', 'thought_balloon', 'feelsgood', 'finnadie', 'goberserk', 'godmode', 'hurtrealbad', 'rage1', 'rage2', 'rage3', 'rage4', 'suspect', 'trollface', 'sunny', 'umbrella', 'cloud', 'snowflake', 'snowman', 'zap', 'cyclone', 'foggy', 'ocean', 'cat', 'dog', 'mouse', 'hamster', 'rabbit', 'wolf', 'frog', 'tiger', 'koala', 'bear', 'pig', 'pig_nose', 'cow', 'boar', 'monkey_face', 'monkey', 'horse', 'racehorse', 'camel', 'sheep', 'elephant', 'panda_face', 'snake', 'bird', 'baby_chick', 'hatched_chick', 'hatching_chick', 'chicken', 'penguin', 'turtle', 'bug', 'honeybee', 'ant', 'beetle', 'snail', 'octopus', 'tropical_fish', 'fish', 'whale', 'whale2', 'dolphin', 'cow2', 'ram', 'rat', 'water_buffalo', 'tiger2', 'rabbit2', 'dragon', 'goat', 'rooster', 'dog2', 'pig2', 'mouse2', 'ox', 'dragon_face', 'blowfish', 'crocodile', 'dromedary_camel', 'leopard', 'cat2', 'poodle', 'paw_prints', 'bouquet', 'cherry_blossom', 'tulip', 'four_leaf_clover', 'rose', 'sunflower', 'hibiscus', 'maple_leaf', 'leaves', 'fallen_leaf', 'herb', 'mushroom', 'cactus', 'palm_tree', 'evergreen_tree', 'deciduous_tree', 'chestnut', 'seedling', 'blossom', 'ear_of_rice', 'shell', 'globe_with_meridians', 'sun_with_face', 'full_moon_with_face', 'new_moon_with_face', 'new_moon', 'waxing_crescent_moon', 'first_quarter_moon', 'waxing_gibbous_moon', 'full_moon', 'waning_gibbous_moon', 'last_quarter_moon', 'waning_crescent_moon', 'last_quarter_moon_with_face', 'first_quarter_moon_with_face', 'moon', 'earth_africa', 'earth_americas', 'earth_asia', 'volcano', 'milky_way', 'partly_sunny', 'octocat', 'squirrel', 'bamboo', 'gift_heart', 'dolls', 'school_satchel', 'mortar_board', 'flags', 'fireworks', 'sparkler', 'wind_chime', 'rice_scene', 'jack_o_lantern', 'ghost', 'santa', 'christmas_tree', 'gift', 'bell', 'no_bell', 'tanabata_tree', 'tada', 'confetti_ball', 'balloon', 'crystal_ball', 'cd', 'dvd', 'floppy_disk', 'camera', 'video_camera', 'movie_camera', 'computer', 'tv', 'iphone', 'phone', 'telephone', 'telephone_receiver', 'pager', 'fax', 'minidisc', 'vhs', 'sound', 'speaker', 'mute', 'loudspeaker', 'mega', 'hourglass', 'hourglass_flowing_sand', 'alarm_clock', 'watch', 'radio', 'satellite', 'loop', 'mag', 'mag_right', 'unlock', 'lock', 'lock_with_ink_pen', 'closed_lock_with_key', 'key', 'bulb', 'flashlight', 'high_brightness', 'low_brightness', 'electric_plug', 'battery', 'calling', 'email', 'mailbox', 'postbox', 'bath', 'bathtub', 'shower', 'toilet', 'wrench', 'nut_and_bolt', 'hammer', 'seat', 'moneybag', 'yen', 'dollar', 'pound', 'euro', 'credit_card', 'money_with_wings', 'e-mail', 'inbox_tray', 'outbox_tray', 'envelope', 'incoming_envelope', 'postal_horn', 'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'door', 'smoking', 'bomb', 'gun', 'hocho', 'pill', 'syringe', 'page_facing_up', 'page_with_curl', 'bookmark_tabs', 'bar_chart', 'chart_with_upwards_trend', 'chart_with_downwards_trend', 'scroll', 'clipboard', 'calendar', 'date', 'card_index', 'file_folder', 'open_file_folder', 'scissors', 'pushpin', 'paperclip', 'black_nib', 'pencil2', 'straight_ruler', 'triangular_ruler', 'closed_book', 'green_book', 'blue_book', 'orange_book', 'notebook', 'notebook_with_decorative_cover', 'ledger', 'books', 'bookmark', 'name_badge', 'microscope', 'telescope', 'newspaper', 'football', 'basketball', 'soccer', 'baseball', 'tennis', '8ball', 'rugby_football', 'bowling', 'golf', 'mountain_bicyclist', 'bicyclist', 'horse_racing', 'snowboarder', 'swimmer', 'surfer', 'ski', 'spades', 'hearts', 'clubs', 'diamonds', 'gem', 'ring', 'trophy', 'musical_score', 'musical_keyboard', 'violin', 'space_invader', 'video_game', 'black_joker', 'flower_playing_cards', 'game_die', 'dart', 'mahjong', 'clapper', 'memo', 'pencil', 'book', 'art', 'microphone', 'headphones', 'trumpet', 'saxophone', 'guitar', 'shoe', 'sandal', 'high_heel', 'lipstick', 'boot', 'shirt', 'tshirt', 'necktie', 'womans_clothes', 'dress', 'running_shirt_with_sash', 'jeans', 'kimono', 'bikini', 'ribbon', 'tophat', 'crown', 'womans_hat', 'mans_shoe', 'closed_umbrella', 'briefcase', 'handbag', 'pouch', 'purse', 'eyeglasses', 'fishing_pole_and_fish', 'coffee', 'tea', 'sake', 'baby_bottle', 'beer', 'beers', 'cocktail', 'tropical_drink', 'wine_glass', 'fork_and_knife', 'pizza', 'hamburger', 'fries', 'poultry_leg', 'meat_on_bone', 'spaghetti', 'curry', 'fried_shrimp', 'bento', 'sushi', 'fish_cake', 'rice_ball', 'rice_cracker', 'rice', 'ramen', 'stew', 'oden', 'dango', 'egg', 'bread', 'doughnut', 'custard', 'icecream', 'ice_cream', 'shaved_ice', 'birthday', 'cake', 'cookie', 'chocolate_bar', 'candy', 'lollipop', 'honey_pot', 'apple', 'green_apple', 'tangerine', 'lemon', 'cherries', 'grapes', 'watermelon', 'strawberry', 'peach', 'melon', 'banana', 'pear', 'pineapple', 'sweet_potato', 'eggplant', 'tomato', 'corn', 'house', 'house_with_garden', 'school', 'office', 'post_office', 'hospital', 'bank', 'convenience_store', 'love_hotel', 'hotel', 'wedding', 'church', 'department_store', 'european_post_office', 'city_sunrise', 'city_sunset', 'japanese_castle', 'european_castle', 'tent', 'factory', 'tokyo_tower', 'japan', 'mount_fuji', 'sunrise_over_mountains', 'sunrise', 'stars', 'themoreyouknow', 'tmyk', 'statue_of_liberty', 'bridge_at_night', 'carousel_horse', 'rainbow', 'ferris_wheel', 'fountain', 'roller_coaster', 'ship', 'speedboat', 'boat', 'sailboat', 'rowboat', 'anchor', 'rocket', 'airplane', 'helicopter', 'steam_locomotive', 'tram', 'mountain_railway', 'bike', 'aerial_tramway', 'suspension_railway', 'mountain_cableway', 'tractor', 'blue_car', 'oncoming_automobile', 'car', 'red_car', 'taxi', 'oncoming_taxi', 'articulated_lorry', 'bus', 'oncoming_bus', 'rotating_light', 'police_car', 'oncoming_police_car', 'fire_engine', 'ambulance', 'minibus', 'truck', 'train', 'station', 'train2', 'bullettrain_front', 'bullettrain_side', 'light_rail', 'monorail', 'railway_car', 'trolleybus', 'ticket', 'fuelpump', 'vertical_traffic_light', 'traffic_light', 'warning', 'construction', 'beginner', 'atm', 'slot_machine', 'busstop', 'barber', 'hotsprings', 'checkered_flag', 'crossed_flags', 'izakaya_lantern', 'moyai', 'circus_tent', 'performing_arts', 'round_pushpin', 'triangular_flag_on_post', 'jp', 'kr', 'cn', 'us', 'fr', 'es', 'it', 'ru', 'gb', 'uk', 'de', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'keycap_ten', '1234', 'zero', 'hash', 'symbols', 'arrow_backward', 'arrow_down', 'arrow_forward', 'arrow_left', 'capital_abcd', 'abcd', 'abc', 'arrow_lower_left', 'arrow_lower_right', 'arrow_right', 'arrow_up', 'arrow_upper_left', 'arrow_upper_right', 'arrow_double_down', 'arrow_double_up', 'arrow_down_small', 'arrow_heading_down', 'arrow_heading_up', 'leftwards_arrow_with_hook', 'arrow_right_hook', 'left_right_arrow', 'arrow_up_down', 'arrow_up_small', 'arrows_clockwise', 'arrows_counterclockwise', 'rewind', 'fast_forward', 'information_source', 'ok', 'twisted_rightwards_arrows', 'repeat', 'repeat_one', 'new', 'top', 'up', 'cool', 'free', 'ng', 'cinema', 'koko', 'signal_strength', 'u5272', 'u5408', 'u55b6', 'u6307', 'u6708', 'u6709', 'u6e80', 'u7121', 'u7533', 'u7a7a', 'u7981', 'sa', 'restroom', 'mens', 'womens', 'baby_symbol', 'no_smoking', 'parking', 'wheelchair', 'metro', 'baggage_claim', 'accept', 'wc', 'potable_water', 'put_litter_in_its_place', 'secret', 'congratulations', 'm', 'passport_control', 'left_luggage', 'customs', 'ideograph_advantage', 'cl', 'sos', 'id', 'no_entry_sign', 'underage', 'no_mobile_phones', 'do_not_litter', 'non-potable_water', 'no_bicycles', 'no_pedestrians', 'children_crossing', 'no_entry', 'eight_spoked_asterisk', 'eight_pointed_black_star', 'heart_decoration', 'vs', 'vibration_mode', 'mobile_phone_off', 'chart', 'currency_exchange', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'ophiuchus', 'six_pointed_star', 'negative_squared_cross_mark', 'a', 'b', 'ab', 'o2', 'diamond_shape_with_a_dot_inside', 'recycle', 'end', 'on', 'soon', 'clock1', 'clock130', 'clock10', 'clock1030', 'clock11', 'clock1130', 'clock12', 'clock1230', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4', 'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7', 'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'heavy_dollar_sign', 'copyright', 'registered', 'tm', 'x', 'heavy_exclamation_mark', 'bangbang', 'interrobang', 'o', 'heavy_multiplication_x', 'heavy_plus_sign', 'heavy_minus_sign', 'heavy_division_sign', 'white_flower', '100', 'heavy_check_mark', 'ballot_box_with_check', 'radio_button', 'link', 'curly_loop', 'wavy_dash', 'part_alternation_mark', 'trident', 'black_square', 'white_square', 'white_check_mark', 'black_square_button', 'white_square_button', 'black_circle', 'white_circle', 'red_circle', 'large_blue_circle', 'large_blue_diamond', 'large_orange_diamond', 'small_blue_diamond', 'small_orange_diamond', 'small_red_triangle', 'small_red_triangle_down', 'shipit'];

          this.allEmojiList = this.emojiList.concat(this.options.customEmoji);

          this.emojiRegex = new RegExp(':(' + this.allEmojiList.join('|') + '):', 'g');
      }

      babelHelpers.createClass(Emoji, [{
          key: 'process',
          value: function process() {
              var _this = this;

              return this.output.replace(this.emojiRegex, function (match, text) {
                  return _this.options.template.emoji(text, _this.options);
              });
          }
      }]);
      return Emoji;
  }();

  var Smiley = function () {
      function Smiley(input, options) {
          babelHelpers.classCallCheck(this, Smiley);

          this.input = ' ' + input + ' '; //hack to consider the first and last element
          this.options = options;

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

          this.escapedSymbols = this.icons.map(function (val) {
              return escapeRegExp(val.text);
          });

          this.smileyRegex = new RegExp('(' + this.escapedSymbols.join('|') + ')', 'g');
      }

      babelHelpers.createClass(Smiley, [{
          key: 'process',
          value: function process() {
              var _this = this;

              var processedString = this.input.replace(this.smileyRegex, function (match, text) {
                  var index = _this.escapedSymbols.indexOf(escapeRegExp(text));
                  var code = _this.icons[index].code;
                  return _this.options.template.smiley(text, code, _this.options);
              });

              return processedString.substring(1, processedString.length - 1);
          }
      }]);
      return Smiley;
  }();

  var Url = function () {
  	function Url(input, options) {
  		babelHelpers.classCallCheck(this, Url);

  		this.input = input;
  		this.options = options;
  		this.urlRegex = urlRegex();
  	}

  	babelHelpers.createClass(Url, [{
  		key: 'process',
  		value: function process() {
  			var _this = this;

  			var config = this.options.linkOptions;
  			return this.input.replace(this.urlRegex, function (match) {
  				var extension = lastElement(match.split('.'));
  				if (lastElement(match) === '/') match = match.slice(0, -1);
  				if (config.exclude.indexOf(extension) === -1) return _this.options.template.url(match, _this.options);
  				return match;
  			});
  		}
  	}]);
  	return Url;
  }();

  (function () {
    'use strict';

    if (self.fetch) {
      return;
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = name.toString();
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = value.toString();
      }
      return value;
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var list = this.map[name];
      if (!list) {
        list = [];
        this.map[name] = list;
      }
      list.push(value);
    };

    Headers.prototype['delete'] = function (name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      var values = this.map[normalizeName(name)];
      return values ? values[0] : null;
    };

    Headers.prototype.getAll = function (name) {
      return this.map[normalizeName(name)] || [];
    };

    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = [normalizeValue(value)];
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      Object.getOwnPropertyNames(this.map).forEach(function (name) {
        this.map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      return fileReaderReady(reader);
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      reader.readAsText(blob);
      return fileReaderReady(reader);
    }

    var support = {
      blob: 'FileReader' in self && 'Blob' in self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in self
    };

    function Body() {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;
        if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (!body) {
          this._bodyText = '';
        } else {
          throw new Error('unsupported BodyInit type');
        }
      };

      if (support.blob) {
        this.blob = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          return this.blob().then(readBlobAsArrayBuffer);
        };

        this.text = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
      } else {
        this.text = function () {
          var rejected = consumed(this);
          return rejected ? rejected : Promise.resolve(this._bodyText);
        };
      }

      if (support.formData) {
        this.formData = function () {
          return this.text().then(decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(url, options) {
      options = options || {};
      this.url = url;

      this.credentials = options.credentials || 'omit';
      this.headers = new Headers(options.headers);
      this.method = normalizeMethod(options.method || 'GET');
      this.mode = options.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }
      this._initBody(options.body);
    }

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function headers(xhr) {
      var head = new Headers();
      var pairs = xhr.getAllResponseHeaders().trim().split('\n');
      pairs.forEach(function (header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();
        head.append(key, value);
      });
      return head;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this._initBody(bodyInit);
      this.type = 'default';
      this.url = null;
      this.status = options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText;
      this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      this.url = options.url || '';
    }

    Body.call(Response.prototype);

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
      // TODO: Request constructor should accept input, init
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL;
          }

          // Avoid security warnings on getResponseHeader when not allowed by CORS
          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
          }
        }

        xhr.onload = function () {
          var status = xhr.status === 1223 ? 204 : xhr.status;
          if (status < 100 || status > 599) {
            reject(new TypeError('Network request failed'));
            return;
          }
          var options = {
            status: status,
            statusText: xhr.statusText,
            headers: headers(xhr),
            url: responseURL()
          };
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };
    self.fetch.polyfill = true;
  })();

  var defaultOptions$1 = {
      timeout: 5000,
      jsonpCallback: 'callback'
  };

  function generateCallbackFunction() {
      return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
  function clearFunction(functionName) {
      // IE8 throws an exception when you try to delete a property on window
      // http://stackoverflow.com/a/1824228/751089
      try {
          delete window[functionName];
      } catch (e) {
          window[functionName] = undefined;
      }
  }

  function removeScript(scriptId) {
      var script = document.getElementById(scriptId);
      document.getElementsByTagName("head")[0].removeChild(script);
  }

  var fetchJsonp = function fetchJsonp(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var timeout = options.timeout != null ? options.timeout : defaultOptions$1.timeout;
      var jsonpCallback = options.jsonpCallback != null ? options.jsonpCallback : defaultOptions$1.jsonpCallback;

      var timeoutId = undefined;

      return new Promise(function (resolve, reject) {
          var callbackFunction = generateCallbackFunction();

          window[callbackFunction] = function (response) {
              resolve({
                  ok: true,
                  //
                  json: function json() {
                      return Promise.resolve(response);
                  }
              });

              if (timeoutId) clearTimeout(timeoutId);

              removeScript(jsonpCallback + '_' + callbackFunction);

              clearFunction(callbackFunction);
          };

          // Check if the user set their own params, and if not add a ? to start a list of params
          url += url.indexOf('?') === -1 ? '?' : '&';

          var jsonpScript = document.createElement('script');
          jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
          jsonpScript.id = jsonpCallback + '_' + callbackFunction;
          document.getElementsByTagName("head")[0].appendChild(jsonpScript);

          timeoutId = setTimeout(function () {
              reject(new Error('JSONP request to ' + url + ' timed out'));

              clearFunction(callbackFunction);
              removeScript(jsonpCallback + '_' + callbackFunction);
          }, timeout);
      });
  };

  /**
   * Plays the video after clicking on the thumbnail
   * @param  {object} options   Options object
   * @return {null}
   */
  function playVideo(options) {
  	/** Execute the customVideoClickHandler if the user wants to handle it on his own. */
  	if (options.customVideoClickHandler) return options.videoClickHandler(options, template);

  	var classes = document.getElementsByClassName(options.videoClickClass);
  	for (var i = 0; i < classes.length; i++) {
  		classes[i].onclick = function () {
  			options.onVideoShow();
  			var url = this.getAttribute('data-ejs-url') + "?autoplay=true";
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
  function template(url, options) {
  	return options.template.vimeo(url, options) || options.template.youtube(url, options);
  }

  function getDetailsTemplate(data, fullData, embedUrl, options) {
  	if (data.host === 'vimeo') {
  		return options.template.detailsVimeo(data, fullData, embedUrl, options);
  	} else if (data.host === 'youtube') {
  		return options.template.detailsYoutube(data, fullData, embedUrl, options);
  	}
  }

  /**
   * Applies video.js to all audio and video dynamically
   * @param  {object} options Options object
   * @return {null}
   */
  function applyVideoJS(options) {
  	options.videojsOptions.width = options.videoWidth;
  	options.videojsOptions.height = options.videoHeight;
  	if (options.videoJS) {
  		if (!window.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
  		var elements = options.input.getElementsByClassName('ejs-video-js');
  		for (var i = 0; i < elements.length; i++) {
  			videojs(elements[i], options.videojsOptions, function () {
  				return options.videojsCallback();
  			});
  		}
  	}
  }

  /**
   * Destroys the onclick event for opening the video template from the details template
   * @param  {className} className
   * @return {null}
   */
  function destroyVideos(className) {
  	var classes = document.getElementsByClassName(className);
  	for (var i = 0; i < classes.length; i++) {
  		classes[i].onclick = null;
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
  	var url = (_this.options.link ? match[0].slice(0, -4) : match[0]) || match[1];
  	if (_this.options.served.indexOf(url) >= 0) return Promise.resolve(null);

  	return new Promise(function (resolve) {
  		urlToText(_this, match, url).then(function (text) {
  			if (!text) return resolve();
  			_this.options.served.push(url);
  			resolve(text);
  		});
  	});
  }

  /**
   * A helper function for inline embedding
   * @param _this
   * @param urlToText
   * @returns Promise
   */
  function inlineEmbed(_this, urlToText) {
  	var regexInline = _this.options.link ? new RegExp('([^>]*' + _this.regex.source + ')</a>', 'gi') : new RegExp('([^\\s]*' + _this.regex.source + ')', 'gi');
  	var match = undefined,
  	    promises = [];

  	while ((match = matches(regexInline, _this.output)) !== null) {
  		promises.push(getInlineData(_this, urlToText, match));
  	}return new Promise(function (resolve) {
  		if (matches.length) Promise.all(promises).then(function (data) {
  			var i = 0;
  			_this.output = _this.output.replace(regexInline, function (match) {
  				if (_this.options.link) return !_this.options.inlineText ? data[i] + '</a>' : match + data[i++];else return !_this.options.inlineText ? data[i] : match + data[i++];
  			});
  			resolve(_this.output);
  		});else resolve(_this.output);
  	});
  }

  function getNormalData(_this, urlToText, match) {
  	var url = match[0];
  	if (_this.options.served.indexOf(url) >= 0) return;

  	return new Promise(function (resolve) {
  		urlToText(_this, match, url, true).then(function (text) {
  			if (!text) resolve();
  			_this.options.served.push(url);
  			_this.embeds.push({
  				text: text,
  				index: match.index
  			});
  			resolve();
  		});
  	});
  }

  /**
   * A helper function for normal embedding
   * @param  {object} _this
   * @param  {function} urlToText
   * @return {Promise}
   */
  function normalEmbed(_this, urlToText) {
  	var match = undefined,
  	    promises = [];
  	while ((match = matches(_this.regex, _this.input)) !== null) {
  		promises.push(getNormalData(_this, urlToText, match));
  	}return new Promise(function (resolve) {
  		Promise.all(promises).then(function () {
  			resolve(_this.embeds);
  		});
  	});
  }

  function embed(_this, urlToText) {
  	return new Promise(function (resolve) {
  		if (ifInline(_this.options, _this.service)) inlineEmbed(_this, urlToText).then(function (output) {
  			return resolve([output, _this.embeds]);
  		});else normalEmbed(_this, urlToText).then(function (embeds) {
  			return resolve([_this.output, embeds]);
  		});
  	});
  }

  var regex = {
  	basicAudio: /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi,
  	soundCloud: /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi,
  	spotify: /spotify.com\/track\/[a-zA-Z0-9_]+/gi,
  	codepen: /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi,
  	gist: /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/gi,
  	highlightCode: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
  	inlineCode: /(`)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
  	ideone: /ideone.com\/[a-zA-Z0-9]{6}/gi,
  	jsbin: /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi,
  	jsfiddle: /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_\/]+/gi,
  	plunker: /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi,
  	basicImage: /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi,
  	flickr: /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/gi,
  	instagram: /instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi,
  	slideShare: /slideshare.net\/[a-zA-Z0-9_-]*\/[a-zA-Z0-9_-]*/gi,
  	github: /[^gist].github.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/gi,
  	basicVideo: /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi,
  	dailymotion: /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi,
  	liveleak: /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi,
  	ted: /ted.com\/talks\/[a-zA-Z0-9_]+/gi,
  	ustream: /ustream.tv\/[a-z\/0-9]*/gi,
  	vimeo: /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi,
  	vine: /vine.co\/v\/[a-zA-Z0-9]+/gi,
  	youtube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi,
  	gmap: /@\((.+)\)/gi,
  	twitter: /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi
  };

  var Twitter = function () {
  	function Twitter(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Twitter);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  		this.regex = regex.twitter;
  		this.service = 'twitter';

  		this.load = this.load.bind(this);
  		this.options.input.addEventListener('rendered', this.load, false);
  	}

  	/**
    * Fetches the data from twitter's oEmbed API
    * @param  {string} url URL of the tweet
    * @return {object}     data containing the tweet info
    */

  	babelHelpers.createClass(Twitter, [{
  		key: 'tweetData',
  		value: function tweetData(url) {
  			var config = this.options.tweetOptions;
  			var apiUrl = 'https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=' + url + '&maxwidth=' + config.maxWidth + '&hide_media=' + config.hideMedia + '&hide_thread=' + config.hideThread + '&align=' + config.align + '&lang=' + config.lang;
  			return new Promise(function (resolve) {
  				fetchJsonp(apiUrl, { credentials: 'include' }).then(function (data) {
  					return data.json();
  				}).then(function (json) {
  					return resolve(json);
  				});
  			});
  		}

  		/**
     * Load twitter widgets
     * @return null
     */

  	}, {
  		key: 'load',
  		value: function load() {
  			var _this2 = this;

  			twttr.widgets.load(this.options.element); //here this refers to the element

  			//Execute the function after the widget is loaded
  			twttr.events.bind('loaded', function () {
  				_this2.options.onTweetsLoad();
  			});
  		}
  	}, {
  		key: 'process',
  		value: function process() {
  			var _this3 = this;

  			return new Promise(function (resolve) {
  				return embed(_this3, Twitter.urlToText).then(function (data) {
  					return resolve(data);
  				});
  			});
  		}
  	}], [{
  		key: 'urlToText',
  		value: function urlToText(_this, match, url) {
  			return new Promise(function (resolve) {
  				_this.tweetData(url).then(function (data) {
  					return resolve(data.html);
  				});
  			});
  		}
  	}]);
  	return Twitter;
  }();

  var Gmap = function () {
      function Gmap(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Gmap);

          this.input = input;
          this.output = output;
          this.options = options;
          this.embeds = embeds;
          this.service = 'map';
          this.regex = regex.gmap;
      }

      /**
       * Takes the location name and returns the coordinates of that location using the Google
       * Map API v3. This is an async function so it will return a promise.
       * @param  {string} location The name of any location
       * @return {array}           Returns an array in the form [latitude, longitude]
       */

      babelHelpers.createClass(Gmap, [{
          key: 'process',
          value: function process() {
              var _this = this;

              var match = undefined,
                  promises = [],
                  allMatches = [];
              while ((match = matches(this.regex, this.output)) !== null) {
                  var promise = this.options.mapOptions.mode !== 'place' ? Gmap.getCoordinate(match[0]) : Promise.resolve([null, null]);
                  promises.push(promise);
                  allMatches.push(match);
              }

              return new Promise(function (resolve) {
                  if (allMatches.length) {
                      //TODO
                      Promise.all(promises).then(function (coordinatesArr) {
                          var _loop = function _loop() {
                              var _coordinatesArr$i = babelHelpers.slicedToArray(coordinatesArr[i], 2);

                              var latitude = _coordinatesArr$i[0];
                              var longitude = _coordinatesArr$i[1];

                              var text = Gmap.template(allMatches[i][0], latitude, longitude, _this.options);
                              if (!ifInline(_this.options, _this.service)) {
                                  _this.output = _this.output.replace(_this.regex, function (regexMatch) {
                                      return '<span class="ejs-location">' + Gmap.locationText(regexMatch) + '</span>' + text;
                                  });
                              } else {
                                  _this.embeds.push({
                                      text: text,
                                      index: allMatches[i][0].index
                                  });
                                  _this.output = _this.output.replace(_this.regex, function (regexMatch) {
                                      return '<span class="ejs-location">' + Gmap.locationText(regexMatch) + '</span>';
                                  });
                              }
                          };

                          for (var i in promises) {
                              _loop();
                          }
                          resolve([_this.output, _this.embeds]);
                      });
                  } else {
                      resolve([_this.output, _this.embeds]);
                  }
              });
          }
      }], [{
          key: 'getCoordinate',
          value: function getCoordinate(location) {
              var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=false';
              return new Promise(function (resolve) {
                  fetch(url).then(function (data) {
                      return data.json();
                  }).then(function (json) {
                      return resolve([json.results[0].geometry.location.lat, json.results[0].geometry.location.lng]);
                  });
              });
          }

          /**
           * Returns the template of the Map widget. The source of the iframe is based on whether the
           * mode set in options is 'place', 'streetview' or 'view'.
           * @param  {string} match     The matching string in the form of @(location name).
           * @param  {number} latitude  Latitude of the location
           * @param  {number} longitude Longitude of the location
           * @param  {object} options   plugin options
           * @return {string}           Template of the map widget.
           */

      }, {
          key: 'template',
          value: function template(match, latitude, longitude, options) {
              var location = Gmap.locationText(match);
              var config = options.mapOptions;
              if (config.mode === 'place') {
                  return '<div class="ejs-embed ejs-map"><iframe width="' + options.videoWidth + '" height="' + options.videoHeight + '" src="https://www.google.com/maps/embed/v1/place?key=' + options.googleAuthKey + '&q=' + location + '"></iframe></div>';
              } else if (config.mode === 'streetview') {
                  return '<div class="ejs-embed ejs-map"><iframe width="' + options.videoWidth + '" height="' + options.videoHeight + '" src="https://www.google.com/maps/embed/v1/streetview?key=' + options.googleAuthKey + '&location=' + latitude + ',' + longitude + '&heading=210&pitch=10&fov=35"></iframe></div>';
              } else if (config.mode === 'view') {
                  return '<div class="ejs-embed ejs-map"><iframe width="' + options.videoWidth + '" height="' + options.videoHeight + '" src="https://www.google.com/maps/embed/v1/view?key=' + options.googleAuthKey + '&center=' + latitude + ',' + longitude + '&zoom=18&maptype=satellite"></iframe></div>';
              }
          }

          /**
           * Extracts out the location name from the format @(locationName)
           * @param  {string} match The string in the supported format. Eg : @(Delhi)
           * @return {string}       Only the location name removing @ and brackets. Eg: Delhi
           */

      }, {
          key: 'locationText',
          value: function locationText(match) {
              return match.split('(')[1].split(')')[0];
          }
      }]);
      return Gmap;
  }();

  var Markdown = function () {
  	function Markdown(output, options) {
  		babelHelpers.classCallCheck(this, Markdown);

  		if (!window.marked) throw new ReferenceError('marked.js is not loaded.');
  		this.output = output;
  		this.options = options;
  	}

  	babelHelpers.createClass(Markdown, [{
  		key: 'process',
  		value: function process() {
  			var _this = this;

  			var renderer = new marked.Renderer();

  			/**
      * Change the default template of the code blocks provided by marked.js
      * @param  {string} text The code block string
      * @return {string}      the new template
      */
  			renderer.code = function (text) {
  				var highlightedCode = window.hljs ? hljs.highlightAuto(text) : {
  					value: text
  				};
  				var language = window.hljs ? highlightedCode.language : '';
  				return '<pre><code class="ejs-code hljs ' + language + '">' + highlightedCode.value + '</code></pre>';
  			};

  			renderer.link = function (href, title, text) {
  				if (href.indexOf('&lt;/a') === -1) return href;
  				if (href.match(/&gt;(.+)&lt;\/a/gi)) {
  					if (!title) title = '';
  					return '<a href="' + RegExp.$1 + '" rel=' + _this.options.linkOptions.rel + '" target="' + _this.options.linkOptions.target + '" title="' + title + '">' + text + '</a>';
  				}
  			};

  			renderer.image = function (href, title, text) {
  				if (href.indexOf('&lt;/a') === -1) return href;
  				if (href.match(/&gt;(.+)&lt;\/a/gi)) {
  					if (!title) title = '';
  					return '<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="' + RegExp.$1 + '" title="' + title + '" alt="' + text + '"/></div></div>';
  				}
  			};

  			renderer.paragraph = function (text) {
  				return '<p> ' + text + ' </p>';
  			}; //for font smiley in end.

  			//Fix for heading that should be actually present in marked.js
  			//if gfm is true the `## Heading` is acceptable but `##Heading` is not
  			marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;
  			marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

  			this.options.markedOptions.renderer = renderer;
  			return marked(this.output, this.options.markedOptions);
  		}
  	}]);
  	return Markdown;
  }();

  var Highlight = function () {
  	function Highlight(output, options) {
  		babelHelpers.classCallCheck(this, Highlight);

  		if (!hljs) {
  			throw new ReferenceError('\'hljs is not defined. HighlightJS library is needed to highlight code. Visit https://highlightjs.org/\'');
  		}
  		this.output = output;
  		this.options = options;
  		this.regex = regex.highlightCode;
  		this.inlineCodeRegex = regex.inlineCode;
  	}

  	/**
    * Encodes the characters like <, > and space and replaces them with
    * &lt;, &gt; and &gt; respectively.
    * @param  {string} code The string that has to be encoded.
    * @return {string}      The encoded string
    */

  	babelHelpers.createClass(Highlight, [{
  		key: 'process',

  		/**
     * Replaces the code block with the pre tags and returns a string having the code
     * formatting using Highlight.js.
     * => Matches the string with the regex and finds the code written in three back-ticks ```
     * => Detects whether any language has been provided by the user.
     *     The format supported by embed.js is
     *         ```[language-name]
     *         var a = 2;
     *         ```
     * => Trims all the unnecessary spaces and newlines from the code.
     * => Passes the code to `hljs.highlightAuto(code, language)` which returns a formatted string
     *     having the html tags for styling. The `language` here is optional. In case we don't pass the
     *     language, it tries to detect the language itself.
     * => Replaces the code string in the template with the formatted string
     * @return {string} The string in which the code is formatted
     */
  		value: function process() {
  			this.output = this.output.replace(this.inlineCodeRegex, function (match, group1, group2) {
  				return '<code>' + group2 + '</code>';
  			});

  			return this.output.replace(this.regex, function (match, group1, group2, group3) {
  				var code = group3;
  				code = Highlight.trimSpace(code);
  				code = Highlight.encode(code);

  				// to prevent auto-linking. Not necessary in code
  				// *blocks*, but in code spans. Will be converted
  				// back after the auto-linker runs.
  				code = code.replace(/:\/\//g, '~P');

  				var language = group2.split('\n')[0];
  				var highlightedCode = undefined;

  				if (language) {
  					highlightedCode = hljs.highlightAuto(code, [language]);
  				} else {
  					highlightedCode = hljs.highlightAuto(code);
  					language = highlightedCode.language;
  				}

  				return Highlight.addTemplate(highlightedCode, language);
  			});
  		}
  	}], [{
  		key: 'encode',
  		value: function encode(code) {
  			code = code.replace(/&amp;/gm, '');
  			code = code.replace(/&lt;/g, '<');
  			code = code.replace(/&gt;/g, '>');
  			return code;
  		}

  		/**
     * removes whitespace characters
     * @param  {string} code The string from which the whitespace has to be removed
     * @return {string}
     */

  	}, {
  		key: 'trimSpace',
  		value: function trimSpace(code) {
  			code = code.replace(/^([ \t]*)/g, ''); // leading whitespace
  			code = code.replace(/[ \t]*$/g, ''); // trailing whitespace
  			return code;
  		}

  		/**
     * Places the code and the language name in the required template
     * @param {string} processedCode
     * @param {string} language
     * @return {string}
     */

  	}, {
  		key: 'addTemplate',
  		value: function addTemplate(processedCode, language) {
  			return '<pre><code class="ejs-code hljs ' + language + '">' + processedCode.value + '</code></pre>';
  		}
  	}]);
  	return Highlight;
  }();

  var Base = function () {
  	function Base(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Base);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  	}

  	babelHelpers.createClass(Base, [{
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

  var Ideone = function (_Base) {
      babelHelpers.inherits(Ideone, _Base);

      function Ideone(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Ideone);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ideone).call(this, input, output, options, embeds));

          _this.regex = regex.ideone;
          _this.service = 'ideone';
          return _this;
      }

      babelHelpers.createClass(Ideone, [{
          key: 'template',
          value: function template(match) {
              return this.options.template.ideone(match, this.options);
          }
      }]);
      return Ideone;
  }(Base);

  var Plunker = function (_Base) {
  	babelHelpers.inherits(Plunker, _Base);

  	function Plunker(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Plunker);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Plunker).call(this, input, output, options, embeds));

  		_this.regex = regex.plunker;
  		_this.service = 'plunker';
  		return _this;
  	}

  	babelHelpers.createClass(Plunker, [{
  		key: 'template',
  		value: function template(match) {
  			var a = match.split('?')[0].split('/'); //TODO : make sure ? is excluded in regex.
  			var id = lastElement(a);
  			return this.options.template.plunker(id, this.options);
  		}
  	}]);
  	return Plunker;
  }(Base);

  var JsBin = function (_Base) {
      babelHelpers.inherits(JsBin, _Base);

      function JsBin(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, JsBin);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(JsBin).call(this, input, output, options, embeds));

          _this.regex = regex.jsbin;
          _this.service = 'jsbin';
          return _this;
      }

      babelHelpers.createClass(JsBin, [{
          key: 'template',
          value: function template(id) {
              return this.options.template.jsBin(id, this.options);
          }
      }]);
      return JsBin;
  }(Base);

  var CodePen = function (_Base) {
      babelHelpers.inherits(CodePen, _Base);

      function CodePen(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, CodePen);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CodePen).call(this, input, output, options, embeds));

          _this.regex = regex.codepen;
          _this.service = 'codepen';
          return _this;
      }

      babelHelpers.createClass(CodePen, [{
          key: 'template',
          value: function template(id) {
              return this.options.template.codePen(id, this.options);
          }
      }]);
      return CodePen;
  }(Base);

  var JsFiddle = function (_Base) {
  	babelHelpers.inherits(JsFiddle, _Base);

  	function JsFiddle(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, JsFiddle);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(JsFiddle).call(this, input, output, options, embeds));

  		_this.regex = regex.jsfiddle;
  		_this.service = 'jsfiddle';
  		return _this;
  	}

  	babelHelpers.createClass(JsFiddle, [{
  		key: 'template',
  		value: function template(id) {
  			id = lastElement(id) == '/' ? id.slice(0, -1) : id;
  			id = id.indexOf('//') !== -1 ? id : '//' + id;
  			return this.options.template.jsFiddle(id, this.options);
  		}
  	}]);
  	return JsFiddle;
  }(Base);

  var Gist = function (_Base) {
      babelHelpers.inherits(Gist, _Base);

      function Gist(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Gist);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Gist).call(this, input, output, options, embeds));

          _this.regex = regex.gist;
          _this.service = 'gist';

          _this.options.input.addEventListener('rendered', function () {
              _this.load();
          });
          return _this;
      }

      babelHelpers.createClass(Gist, [{
          key: 'template',
          value: function template(match) {
              return '<div class="ejs-gist" data-src="' + match + '"></div>';
          }
      }, {
          key: 'load',
          value: function load() {
              var gists = this.options.input.getElementsByClassName('ejs-gist');
              for (var i = 0; i < gists.length; i++) {
                  var gistFrame = document.createElement("iframe");
                  gistFrame.setAttribute("width", "100%");
                  gistFrame.id = 'ejs-gist-' + i;

                  var zone = gists[i];
                  zone.innerHTML = "";
                  zone.appendChild(gistFrame);

                  // Create the iframe's document
                  var url = gists[i].getAttribute('data-src');
                  url = url.indexOf('http') === -1 ? 'https://' + url : url;
                  var gistFrameHTML = '<html><base target="_parent"/><body onload="parent.document.getElementById(\'ejs-gist-' + i + '\').style.height=parseInt(document.body.scrollHeight)+20+\'px\'"><script type="text/javascript" src="' + url + '.js"></script></body></html>';

                  // Set iframe's document with a trigger for this document to adjust the height
                  var gistFrameDoc = gistFrame.document;

                  if (gistFrame.contentDocument) {
                      gistFrameDoc = gistFrame.contentDocument;
                  } else if (gistFrame.contentWindow) {
                      gistFrameDoc = gistFrame.contentWindow.document;
                  }

                  gistFrameDoc.open();
                  gistFrameDoc.writeln(gistFrameHTML);
                  gistFrameDoc.close();
              }
          }
      }]);
      return Gist;
  }(Base);

  var Ted = function (_Base) {
  	babelHelpers.inherits(Ted, _Base);

  	function Ted(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Ted);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ted).call(this, input, output, options, embeds));

  		_this.regex = regex.ted;
  		_this.service = 'ted';
  		return _this;
  	}

  	babelHelpers.createClass(Ted, [{
  		key: 'template',
  		value: function template(match) {
  			var id = lastElement(match.split('/'));
  			return this.options.template.ted(id, this.options);
  		}
  	}]);
  	return Ted;
  }(Base);

  var Dailymotion = function (_Base) {
      babelHelpers.inherits(Dailymotion, _Base);

      function Dailymotion(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Dailymotion);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Dailymotion).call(this, input, output, options, embeds));

          _this.regex = regex.dailymotion;
          _this.service = 'dailymotion';
          return _this;
      }

      babelHelpers.createClass(Dailymotion, [{
          key: 'template',
          value: function template(match) {
              var id = lastElement(match.split('/'));
              return this.options.template.dailymotion(id, this.options);
          }
      }]);
      return Dailymotion;
  }(Base);

  var Ustream = function (_Base) {
      babelHelpers.inherits(Ustream, _Base);

      function Ustream(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Ustream);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ustream).call(this, input, output, options, embeds));

          _this.regex = regex.ustream;
          _this.service = 'ustream';
          return _this;
      }

      babelHelpers.createClass(Ustream, [{
          key: 'template',
          value: function template(match) {
              var id = match.split('/');
              id.splice(1, 0, 'embed');
              return this.options.template.ustream(id, this.options);
          }
      }]);
      return Ustream;
  }(Base);

  var LiveLeak = function (_Base) {
      babelHelpers.inherits(LiveLeak, _Base);

      function LiveLeak(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, LiveLeak);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LiveLeak).call(this, input, output, options, embeds));

          _this.regex = regex.liveleak;
          _this.service = 'liveleak';
          return _this;
      }

      babelHelpers.createClass(LiveLeak, [{
          key: 'template',
          value: function template(match) {
              return this.options.template.liveLeak(match, this.options);
          }
      }]);
      return LiveLeak;
  }(Base);

  var Vine = function (_Base) {
      babelHelpers.inherits(Vine, _Base);

      function Vine(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Vine);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Vine).call(this, input, output, options, embeds));

          _this.regex = regex.vine;
          _this.service = 'vine';
          return _this;
      }

      babelHelpers.createClass(Vine, [{
          key: 'template',
          value: function template(match) {
              var id = lastElement(match.split('/'));
              return this.options.template.vine(id, this.options);
          }
      }]);
      return Vine;
  }(Base);

  var Youtube = function () {
  	function Youtube(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Youtube);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  		this.regex = regex.youtube;
  		this.service = 'youtube';
  	}

  	babelHelpers.createClass(Youtube, [{
  		key: 'data',
  		value: function data(id) {
  			var url = 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=' + this.options.googleAuthKey + '&part=snippet,statistics';
  			return new Promise(function (resolve) {
  				fetch(url).then(function (data) {
  					return data.json();
  				}).then(function (json) {
  					return resolve(json.items[0]);
  				});
  			});
  		}
  	}, {
  		key: 'process',
  		value: function process() {
  			var _this2 = this;

  			return new Promise(function (resolve) {
  				return embed(_this2, Youtube.urlToText).then(function (data) {
  					return resolve(data);
  				});
  			});
  		}
  	}], [{
  		key: 'formatData',
  		value: function formatData(data, truncate) {
  			return {
  				title: data.snippet.title,
  				thumbnail: data.snippet.thumbnails.medium.url,
  				rawDescription: data.snippet.description,
  				views: data.statistics.viewCount,
  				likes: data.statistics.likeCount,
  				description: truncate(data.snippet.description, 150),
  				url: 'https://www.youtube.com/watch?v=' + data.id,
  				id: data.id,
  				host: 'youtube'
  			};
  		}
  	}, {
  		key: 'urlToText',
  		value: function urlToText(_this, match, url, normalEmbed) {
  			var id = normalEmbed ? match[1] : match[2];
  			var embedUrl = 'https://www.youtube.com/embed/' + id;
  			if (_this.options.videoDetails) {
  				return new Promise(function (resolve) {
  					_this.data(id).then(function (data) {
  						return resolve(getDetailsTemplate(Youtube.formatData(data, truncate), data, embedUrl, _this.options));
  					});
  				});
  			} else {
  				return new Promise(function (resolve) {
  					return resolve(template(embedUrl, _this.options));
  				});
  			}
  		}
  	}]);
  	return Youtube;
  }();

  var Vimeo = function () {
  	function Vimeo(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Vimeo);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  		this.regex = regex.vimeo;
  		this.service = 'vimeo';
  	}

  	babelHelpers.createClass(Vimeo, [{
  		key: 'data',
  		value: function data(id) {
  			var url = 'https://vimeo.com/api/v2/video/' + id + '.json';
  			return new Promise(function (resolve) {
  				fetch(url).then(function (data) {
  					return data.json();
  				}).then(function (json) {
  					return resolve(json[0]);
  				});
  			});
  		}
  	}, {
  		key: 'process',
  		value: function process() {
  			var _this2 = this;

  			return new Promise(function (resolve) {
  				return embed(_this2, Vimeo.urlToText).then(function (data) {
  					return resolve(data);
  				});
  			});
  		}
  	}], [{
  		key: 'formatData',
  		value: function formatData(data, truncate) {
  			return {
  				title: data.title,
  				thumbnail: data.thumbnail_medium,
  				rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
  				views: data.stats_number_of_plays,
  				likes: data.stats_number_of_likes,
  				description: truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
  				url: data.url,
  				id: data.id,
  				host: 'vimeo'
  			};
  		}
  	}, {
  		key: 'urlToText',
  		value: function urlToText(_this, match, url, normalEmbed) {
  			var id = undefined;
  			if (!normalEmbed) {
  				id = _this.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
  			} else {
  				id = match[3];
  			}
  			if (!id) return;
  			var embedUrl = 'https://player.vimeo.com/video/' + id;
  			if (_this.options.videoDetails) {
  				return new Promise(function (resolve) {
  					_this.data(id).then(function (data) {
  						return resolve(getDetailsTemplate(Vimeo.formatData(data, truncate), data, embedUrl, _this.options));
  					});
  				});
  			} else {
  				return new Promise(function (resolve) {
  					return resolve(template(embedUrl, _this.options));
  				});
  			}
  		}
  	}]);
  	return Vimeo;
  }();

  var BasicVideo = function (_Base) {
  	babelHelpers.inherits(BasicVideo, _Base);

  	function BasicVideo(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, BasicVideo);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BasicVideo).call(this, input, output, options, embeds));

  		_this.regex = regex.basicVideo;
  		_this.service = 'video';
  		return _this;
  	}

  	babelHelpers.createClass(BasicVideo, [{
  		key: 'template',
  		value: function template(match) {
  			return this.options.template.basicVideo(match, this.options);
  		}
  	}]);
  	return BasicVideo;
  }(Base);

  var SoundCloud = function (_Base) {
  	babelHelpers.inherits(SoundCloud, _Base);

  	function SoundCloud(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, SoundCloud);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SoundCloud).call(this, input, output, options, embeds));

  		_this.regex = regex.soundCloud;
  		_this.service = 'soundcloud';
  		return _this;
  	}

  	babelHelpers.createClass(SoundCloud, [{
  		key: 'template',
  		value: function template(match) {
  			return this.options.template.soundCloud(match, this.options);
  		}
  	}]);
  	return SoundCloud;
  }(Base);

  var Spotify = function (_Base) {
  	babelHelpers.inherits(Spotify, _Base);

  	function Spotify(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Spotify);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Spotify).call(this, input, output, options, embeds));

  		_this.regex = regex.spotify;
  		_this.service = 'spotify';
  		return _this;
  	}

  	babelHelpers.createClass(Spotify, [{
  		key: 'template',
  		value: function template(match) {
  			var id = lastElement(match.split('/'));
  			return this.options.template.spotify(id, this.options);
  		}
  	}]);
  	return Spotify;
  }(Base);

  var BasicAudio = function (_Base) {
      babelHelpers.inherits(BasicAudio, _Base);

      function BasicAudio(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, BasicAudio);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BasicAudio).call(this, input, output, options, embeds));

          _this.regex = regex.basicAudio;
          _this.service = 'audio';
          return _this;
      }

      babelHelpers.createClass(BasicAudio, [{
          key: 'template',
          value: function template(match) {
              return this.options.template.basicAudio(match, this.options);
          }
      }]);
      return BasicAudio;
  }(Base);

  var Flickr = function (_Base) {
  	babelHelpers.inherits(Flickr, _Base);

  	function Flickr(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Flickr);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Flickr).call(this, input, output, options, embeds));

  		_this.regex = regex.flickr;
  		_this.service = 'flickr';
  		return _this;
  	}

  	babelHelpers.createClass(Flickr, [{
  		key: 'template',
  		value: function template(match) {
  			return this.options.template.flickr(match, this.options);
  		}
  	}]);
  	return Flickr;
  }(Base);

  var Instagram = function (_Base) {
  	babelHelpers.inherits(Instagram, _Base);

  	function Instagram(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Instagram);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Instagram).call(this, input, output, options, embeds));

  		_this.regex = regex.instagram;
  		_this.service = 'instagram';
  		return _this;
  	}

  	babelHelpers.createClass(Instagram, [{
  		key: 'template',
  		value: function template(match) {
  			return this.options.template.instagram(match, this.options);
  		}
  	}]);
  	return Instagram;
  }(Base);

  var Basic = function (_Base) {
  	babelHelpers.inherits(Basic, _Base);

  	function Basic(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Basic);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Basic).call(this, input, output, options, embeds));

  		_this.regex = regex.basicImage;
  		_this.service = 'image';
  		return _this;
  	}

  	babelHelpers.createClass(Basic, [{
  		key: 'template',
  		value: function template(match) {
  			return this.options.template.basicImage(match, this.options);
  		}
  	}]);
  	return Basic;
  }(Base);

  var SlideShare = function () {
  	function SlideShare(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, SlideShare);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  		this.regex = regex.slideShare;
  		this.service = 'slideshare';
  	}

  	babelHelpers.createClass(SlideShare, [{
  		key: 'template',
  		value: function template(html) {
  			return this.options.template.slideShare(html, this.options);
  		}
  	}, {
  		key: 'process',
  		value: function process() {
  			var _this2 = this;

  			return new Promise(function (resolve) {
  				return embed(_this2, SlideShare.urlToText).then(function (data) {
  					return resolve(data);
  				});
  			});
  		}
  	}], [{
  		key: 'fetchData',
  		value: function fetchData(_this, url) {
  			var api = 'http://www.slideshare.net/api/oembed/2?url=' + url + '&format=jsonp&maxwidth=' + _this.options.videoWidth + '&maxheight=' + _this.options.videoHeight;
  			return new Promise(function (resolve) {
  				fetchJsonp(api, { credentials: 'include' }).then(function (data) {
  					return data.json();
  				}).then(function (json) {
  					return resolve(json.html);
  				});
  			});
  		}
  	}, {
  		key: 'urlToText',
  		value: function urlToText(_this, match, url) {
  			return new Promise(function (resolve) {
  				SlideShare.fetchData(_this, url).then(function (html) {
  					return resolve(_this.template(html));
  				});
  			});
  		}
  	}]);
  	return SlideShare;
  }();

  var OpenGraph = function () {
  	function OpenGraph(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, OpenGraph);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  		this.service = 'opengraph';
  		this.regex = urlRegex();
  		this.excludeRegex = new RegExp(['.mp4|.mp3|.gif|.pdf|.doc|.ppt|.docx|.jpg|.jpeg|.ogg'].concat(options.openGraphExclude).join('|'), 'gi');
  	}

  	babelHelpers.createClass(OpenGraph, [{
  		key: 'template',
  		value: function template(data) {
  			return this.options.template.openGraph(data, this.options);
  		}
  	}, {
  		key: 'process',
  		value: function process() {
  			return new Promise(function (resolve) {
  				embed(this, OpenGraph.urlToText).then(function (data) {
  					return resolve(data);
  				});
  			});
  		}
  	}], [{
  		key: 'fetchData',
  		value: function fetchData(url, _) {
  			url = encodeURIComponent(url);
  			var api = new Function('url', 'return `' + _.options.openGraphEndpoint + '`')(url);
  			return new Promise(function (resolve) {
  				fetch(api).then(function (res) {
  					return res.json();
  				}).then(function (json) {
  					return resolve(_.options.onOpenGraphFetch(json) || json);
  				});
  			});
  		}
  	}, {
  		key: 'urlToText',
  		value: function urlToText(_, match, url) {
  			if (!url.match(_.excludeRegex)) return;

  			return new Promise(function (resolve) {
  				OpenGraph.fetchData(url, _).then(function (data) {
  					return resolve(data && data.success ? _.template(data) : null);
  				});
  			});
  		}
  	}]);
  	return OpenGraph;
  }();

  var Github = function () {
  	function Github(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Github);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  		this.service = 'github';
  		this.regex = regex.github;
  	}

  	babelHelpers.createClass(Github, [{
  		key: 'process',
  		value: function process() {
  			var _this2 = this;

  			return new Promise(function (resolve) {
  				return embed(_this2, Github.urlToText).then(function (data) {
  					return resolve(data);
  				});
  			});
  		}
  	}], [{
  		key: 'fetchRepo',
  		value: function fetchRepo(data) {
  			var api = 'https://api.github.com/repos/' + data.user + '/' + data.repo;
  			return new Promise(function (resolve) {
  				fetch(api).then(function (data) {
  					return data.json();
  				}).then(function (json) {
  					return resolve(json);
  				});
  			});
  		}
  	}, {
  		key: 'template',
  		value: function template(data, options) {
  			return options.template.github(data, options);
  		}
  	}, {
  		key: 'urlToText',
  		value: function urlToText(_this, match, url, normalEmbed) {
  			var data = !normalEmbed ? {
  				user: match[2],
  				repo: match[3]
  			} : {
  				user: match[1],
  				repo: match[2]
  			};

  			if (!data.repo) return;
  			return new Promise(function (resolve) {
  				Github.fetchRepo(data).then(function (response) {
  					return resolve(Github.template(response, _this.options));
  				});
  			});
  		}
  	}]);
  	return Github;
  }();

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

  var instances = [];
  var allInstances = [];
  var promises = [];

  var EmbedJS = function () {
  	/**
    * The constructor takes two arguements. The first one is the options object and the second one is the
    * optional string . If the user wants to provide a string directly instead of the element, he can do that.
    * In case the user provides both the input element and the string, the input string will be taken from the element
    * and the provided string won't be processed.
    *
    * @param  {object} options The options object
    * @param template
    * @return {null}
    */

  	function EmbedJS(options, template) {
  		babelHelpers.classCallCheck(this, EmbedJS);

  		/**
     * We have created a clone of the original options to make sure that the original object
     * isn't altered.
     */
  		var defOpts = cloneObject(defaultOptions);
  		var globOpts = cloneObject(globalOptions);

  		//merge global options with the default options
  		var globOptions = deepExtend(defOpts, globOpts);

  		//deepExtend global options with the overriding options provided by the user as an options
  		//object while creating a new instance of embed.js
  		this.options = deepExtend(globOptions, options);

  		this.options.template = template || new Renderer();

  		if (!this.options.input || !(typeof this.options.input === 'string' || babelHelpers.typeof(this.options.input) === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

  		this.input = babelHelpers.typeof(this.options.input) === 'object' ? this.options.input.innerHTML : this.options.input;
  	}

  	/**
    * Processes the string and performs all the insertions and manipulations based on
    * the options and the input provided by the user. This returns a promise which is resolved once the result data is ready
    * @return {Promise} The processes resulting string
    */

  	babelHelpers.createClass(EmbedJS, [{
  		key: 'process',
  		value: function process() {
  			var _this = this;

  			var input = this.input;
  			var options = processOptions(this.options);
  			var embeds = [];
  			var output = '';

  			this.options.beforeEmbedJSApply();

  			return new Promise(function (resolve) {
  				if (true && options.link) output = new Url(input, options).process();

  				var openGraphPromise = true && options.openGraphEndpoint ? new OpenGraph(input, output, options, embeds).process() : Promise.resolve([output, embeds]);

  				openGraphPromise.then(function (_ref) {
  					var _ref2 = babelHelpers.slicedToArray(_ref, 2);

  					var output = _ref2[0];
  					var embeds = _ref2[1];

  					if (true && options.marked) {
  						output = new Markdown(output, options).process();
  					}
  					if (true && options.emoji) {
  						output = new Emoji(output, options).process();
  					}
  					if (true && options.fontIcons) {
  						output = new Smiley(output, options).process();
  					}

  					if (true && options.highlightCode && !options.marked) {
  						output = new Highlight(output, options).process();
  					}
  					if (true && ifEmbed(options, 'ideone')) {
  						var _process = new Ideone(input, output, options, embeds).process();

  						var _process2 = babelHelpers.slicedToArray(_process, 2);

  						output = _process2[0];
  						embeds = _process2[1];
  					}
  					if (true && ifEmbed(options, 'plunker')) {
  						var _process3 = new Plunker(input, output, options, embeds).process();

  						var _process4 = babelHelpers.slicedToArray(_process3, 2);

  						output = _process4[0];
  						embeds = _process4[1];
  					}
  					if (true && ifEmbed(options, 'jsbin')) {
  						var _process5 = new JsBin(input, output, options, embeds).process();

  						var _process6 = babelHelpers.slicedToArray(_process5, 2);

  						output = _process6[0];
  						embeds = _process6[1];
  					}
  					if (true && ifEmbed(options, 'codepen')) {
  						var _process7 = new CodePen(input, output, options, embeds).process();

  						var _process8 = babelHelpers.slicedToArray(_process7, 2);

  						output = _process8[0];
  						embeds = _process8[1];
  					}
  					if (true && ifEmbed(options, 'jsfiddle')) {
  						var _process9 = new JsFiddle(input, output, options, embeds).process();

  						var _process10 = babelHelpers.slicedToArray(_process9, 2);

  						output = _process10[0];
  						embeds = _process10[1];
  					}
  					if (true && ifEmbed(options, 'gist')) {
  						var _process11 = new Gist(input, output, options, embeds).process();

  						var _process12 = babelHelpers.slicedToArray(_process11, 2);

  						output = _process12[0];
  						embeds = _process12[1];
  					}

  					if (true && ifEmbed(options, 'ted')) {
  						var _process13 = new Ted(input, output, options, embeds).process();

  						var _process14 = babelHelpers.slicedToArray(_process13, 2);

  						output = _process14[0];
  						embeds = _process14[1];
  					}
  					if (true && ifEmbed(options, 'dailymotion')) {
  						var _process15 = new Dailymotion(input, output, options, embeds).process();

  						var _process16 = babelHelpers.slicedToArray(_process15, 2);

  						output = _process16[0];
  						embeds = _process16[1];
  					}
  					if (true && ifEmbed(options, 'ustream')) {
  						var _process17 = new Ustream(input, output, options, embeds).process();

  						var _process18 = babelHelpers.slicedToArray(_process17, 2);

  						output = _process18[0];
  						embeds = _process18[1];
  					}
  					if (true && ifEmbed(options, 'liveleak')) {
  						var _process19 = new LiveLeak(input, output, options, embeds).process();

  						var _process20 = babelHelpers.slicedToArray(_process19, 2);

  						output = _process20[0];
  						embeds = _process20[1];
  					}
  					if (true && options.videoEmbed) {
  						var _process21 = new BasicVideo(input, output, options, embeds).process();

  						var _process22 = babelHelpers.slicedToArray(_process21, 2);

  						output = _process22[0];
  						embeds = _process22[1];
  					}
  					if (true && ifEmbed(options, 'vine')) {
  						var _process23 = new Vine(input, output, options, embeds).process();

  						var _process24 = babelHelpers.slicedToArray(_process23, 2);

  						output = _process24[0];
  						embeds = _process24[1];
  					}

  					if (true && ifEmbed(options, 'soundcloud')) {
  						var _process25 = new SoundCloud(input, output, options, embeds).process();

  						var _process26 = babelHelpers.slicedToArray(_process25, 2);

  						output = _process26[0];
  						embeds = _process26[1];
  					}
  					if (true && ifEmbed(options, 'spotify')) {
  						var _process27 = new Spotify(input, output, options, embeds).process();

  						var _process28 = babelHelpers.slicedToArray(_process27, 2);

  						output = _process28[0];
  						embeds = _process28[1];
  					}
  					if (true && options.audioEmbed) {
  						var _process29 = new BasicAudio(input, output, options, embeds).process();

  						var _process30 = babelHelpers.slicedToArray(_process29, 2);

  						output = _process30[0];
  						embeds = _process30[1];
  					}

  					if (true && ifEmbed(options, 'flickr')) {
  						var _process31 = new Flickr(input, output, options, embeds).process();

  						var _process32 = babelHelpers.slicedToArray(_process31, 2);

  						output = _process32[0];
  						embeds = _process32[1];
  					}
  					if (true && ifEmbed(options, 'instagram')) {
  						var _process33 = new Instagram(input, output, options, embeds).process();

  						var _process34 = babelHelpers.slicedToArray(_process33, 2);

  						output = _process34[0];
  						embeds = _process34[1];
  					}
  					if (true && options.imageEmbed) {
  						var _process35 = new Basic(input, output, options, embeds).process();

  						var _process36 = babelHelpers.slicedToArray(_process35, 2);

  						output = _process36[0];
  						embeds = _process36[1];
  					}
  					return true && ifEmbed(options, 'youtube') ? new Youtube(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
  				}).then(function (_ref3) {
  					var _ref4 = babelHelpers.slicedToArray(_ref3, 2);

  					var output = _ref4[0];
  					var embeds = _ref4[1];

  					return true && ifEmbed(options, 'vimeo') ? new Vimeo(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
  				}).then(function (_ref5) {
  					var _ref6 = babelHelpers.slicedToArray(_ref5, 2);

  					var output = _ref6[0];
  					var embeds = _ref6[1];

  					return true && ifEmbed(options, 'opengraph') ? new Github(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
  				}).then(function (_ref7) {
  					var _ref8 = babelHelpers.slicedToArray(_ref7, 2);

  					var output = _ref8[0];
  					var embeds = _ref8[1];

  					return true && options.locationEmbed ? new Gmap(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
  				}).then(function (_ref9) {
  					var _ref10 = babelHelpers.slicedToArray(_ref9, 2);

  					var output = _ref10[0];
  					var embeds = _ref10[1];

  					return true && ifEmbed(options, 'slideshare') ? new SlideShare(input, output, options, embeds).process() : Promise.resolve([output, embeds]);
  				}).then(function (_ref11) {
  					var _ref12 = babelHelpers.slicedToArray(_ref11, 2);

  					var output = _ref12[0];
  					var embeds = _ref12[1];

  					if (options.tweetsEmbed && true) {
  						_this.twitter = new Twitter(input, output, options, embeds);
  						return _this.twitter.process();
  					} else {
  						return Promise.resolve([output, embeds]);
  					}
  				}).then(function (_ref13) {
  					var _ref14 = babelHelpers.slicedToArray(_ref13, 2);

  					var output = _ref14[0];
  					var embeds = _ref14[1];

  					_this.data = {
  						input: options.input,
  						output: output,
  						options: options,
  						inputString: _this.input,
  						/**
        	 TODO:
         - Restructure served urls structure with services name
        	 */

  						services: options.served,
  						template: options.template
  					};

  					resolve(createText(output, embeds));
  				});
  			});
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

  	}, {
  		key: 'render',
  		value: function render() {
  			var _this2 = this;

  			if (typeof this.options.input === 'string') throw new Error('You cannot call render method for a string');
  			if (!this.options.input) throw new Error('You didn\'t pass an element while creating this instance. render() method can\'t work without an input element');

  			return new Promise(function (resolve) {
  				_this2.process().then(function (data) {
  					_this2.options.input.innerHTML = data;
  					_this2.applyListeners();
  					resolve(_this2.data);
  				});
  			});
  		}

  		/**
     * This method listens to all the events like click, handle
     * events to be done after an element has been rendered. These
     * include twitter widget rendering, gist embedding, click event listeners .
     */

  	}, {
  		key: 'applyListeners',
  		value: function applyListeners() {
  			applyVideoJS(this.options);

  			playVideo(this.options);

  			var event = new Event('rendered');
  			this.options.input.dispatchEvent(event);

  			this.options.afterEmbedJSApply();
  		}

  		/**
     * This function updates the parametrs of the current instance
     * @param options   New updated options object. will be extended with the older options
     * @param template  [optional] the new template instance
     */

  	}, {
  		key: 'update',
  		value: function update(options, template) {

  			if (options) this.options = deepExtend(this.options, options);

  			if (template) this.options.template = template;

  			if (!this.options.input || !(typeof this.options.input === 'string' || babelHelpers.typeof(this.options.input) === 'object')) throw ReferenceError("You need to pass an element or the string that needs to be processed");

  			this.input = babelHelpers.typeof(this.options.input) === 'object' ? this.options.input.innerHTML : this.options.input;
  		}

  		/**
     * returns the resulting string based on the input and the options passed by the user.
     * @return Promise
     */

  	}, {
  		key: 'text',
  		value: function text() {
  			var _this3 = this;

  			return new Promise(function (resolve) {
  				_this3.process().then(function () {
  					resolve(_this3.data);
  				});
  			});
  		}

  		/**
     * The destroy method destroys all the listeners and replaces the rih text with the original text in the
     * element.
     * @return {null}
     */

  	}, {
  		key: 'destroy',
  		value: function destroy() {
  			if (!this.element) throw new Error('destroy() method only if an element had been passed in the options object');
  			destroyVideos('ejs-video-thumb');
  			this.element.removeEventListener('rendered', this.twitter.load(), false);
  			this.element.innerHTML = this.input;
  		}

  		/**
     * Sets options globally
     * @param {object} options
     */

  	}], [{
  		key: 'setOptions',
  		value: function setOptions(options) {
  			globalOptions = deepExtend(defaultOptions, options);
  		}

  		/**
     * Applies embed.js to all the elements with the class name provided as option
     * @return {Promise}
     * @param selectorName
     * @param options
     * @param template
     */

  	}, {
  		key: 'applyEmbedJS',
  		value: function applyEmbedJS(selectorName) {
  			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  			var template = arguments.length <= 2 || arguments[2] === undefined ? new Renderer() : arguments[2];

  			var elements = document.querySelectorAll(selectorName);
  			for (var i = 0; i < elements.length; i++) {
  				options.input = elements[i];
  				instances[i] = new EmbedJS(options, template);
  				promises[i] = instances[i].render();
  			}
  			return new Promise(function (resolve) {
  				Promise.all(promises).then(function (val) {
  					resolve(val);
  				});
  			});
  		}

  		/**
     * Destroys all the instances of EmbedJS created by using applyEmbedJS() method.
     * @return {null}
     */

  	}, {
  		key: 'destroyEmbedJS',
  		value: function destroyEmbedJS() {
  			for (var i = 0; i < instances.length; i++) {
  				instances[i].destroy();
  			}
  		}

  		/**
     * Destroys all instances of EmbedJS on the page
     * @return {null}
     */

  	}, {
  		key: 'destroyAll',
  		value: function destroyAll() {
  			for (var i = 0; i < allInstances.length; i++) {
  				allInstances[i].destroy();
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

  	}, {
  		key: 'Template',
  		value: function Template() {
  			return new Renderer();
  		}
  	}]);
  	return EmbedJS;
  }();

  return EmbedJS;

}));
//# sourceMappingURL=embed.js.map