'use strict';

function babelHelpers_typeof (obj) {
  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var utils = {

    /**
     * Trucates the string and adds ellipsis at the end.
     * @param string        The string to be truncated
     * @param n             Length to which it should be truncated
     * @returns {string}    The truncated string
     */

    truncate: function truncate(string, n) {
        return string.substr(0, n - 1) + (string.length > n ? '...' : '');
    },

    /**
     * Returns an array after removing the duplicates.
     * @param array         The array containing the duplicates
     * @returns {Array}     Array with unique values.
     */
    getUnique: function getUnique(array) {
        var u = {},
            a = [];

        array.forEach(function (value) {
            if (!u.hasOwnProperty(value)) {
                a.push(value);
                u[value] = 1;
            }
        });
        return a;
    },

    /**
     * Converts a string into legitimate url.
     * @param string
     */
    toUrl: function toUrl(string) {
        return string.indexOf('//') === -1 ? '//' + string : string;
    },

    /**
     * Extends an Object
     * @param destination
     * @param source
     * @returns {*}
     */
    deepExtend: function deepExtend(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                this.deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    },
    escapeRegExp: function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    },

    /**
     * Sort an array of objects based on the index value
     * @param  {Array} arr Array to be sorted
     * @return {Array}     Sorted array
     */
    sortObject: function sortObject(arr) {
        return arr.sort(function (a, b) {
            return a.index - b.index;
        });
    },

    /**
     * Creates the string of the iframes after sorting them and finally returning a string
     * @param  {sring} str    String to which the created text has to be added
     * @param  {object} embeds Sorted array of iframe html
     * @return {string}        String to be rendered
     */
    createText: function createText(str, embeds) {
        var sortedEmbeds = this.sortObject(embeds);
        for (var i = 0; i < sortedEmbeds.length; i++) {
            str += ' ' + sortedEmbeds[i].text;
        }
        return str;
    },

    /**
     * Matches the string and finds the substrings matching to the provided regex pattern
     * @param  {object} regex Regex pattern
     * @param  {string} input The string to be analyzed
     * @return {object}       Returns the matched substring with their corresponding positions
     */
    matches: function matches(regex, input) {
        return regex.exec(input);
    },

    /**
     * Checks wheteher a particular service should be embedded or not based on
     * the setting provided by the user
     * @param  {object} options The options provided by the user
     * @param  {string} service Name of the service for which the condition is to be analyzed
     * @return {boolean}        True if it should be embedded
     */
    ifEmbed: function ifEmbed(options, service) {
        return options.excludeEmbed.indexOf(service) == -1 && options.excludeEmbed !== 'all';
    },
    ifInline: function ifInline(options, service) {
        return options.inlineEmbed.indexOf(service) == -1 && options.inlineEmbed !== 'all';
    },

    /**
     * Calculates the dimensions for the elements based on a aspect ratio
     * @param  {object} options Plugin options
     * @return {object}         The width and height of the elements
     */
    dimensions: function dimensions(options) {
        var dimensions = {
            width: options.videoWidth,
            height: options.videoHeight
        };
        if (options.videoHeight && options.videoWidth) {
            return dimensions;
        } else if (options.videoHeight) {
            dimensions.width = options.videoHeight / 3 * 4;
            return dimensions;
        } else if (options.videoWidth) {
            dimensions.height = dimensions.width / 4 * 3;
            return dimensions;
        } else {
            var _ref = [800, 600];
            dimensions.width = _ref[0];
            dimensions.height = _ref[1];

            return dimensions;
        }
    },

    /**
     * Returns a cloned object
     * @param  {object} obj
     * @return {object}     cloned object
     */
    cloneObject: function cloneObject(obj) {
        if (obj === null || (typeof obj === 'undefined' ? 'undefined' : babelHelpers_typeof(obj)) !== 'object') return obj;
        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = this.cloneObject(obj[key]);
        }
        return temp;
    },
    urlRegex: function urlRegex() {
        return (/((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:buff\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi
        );
    }
};

var expect = require('chai').expect;

describe('toUrl() method', function () {
    "use strict";

    it('should convert string into a valid url', function () {
        expect(utils.toUrl('github.com')).to.equal('//github.com');
        expect(utils.toUrl('//github.com')).to.equal('//github.com');
    });

    it('should return a string', function () {
        expect(utils.toUrl('github.com')).to.be.a('string');
    });
});

describe('truncate() method', function () {
    "use strict";

    it('should return a string', function () {
        expect(utils.truncate('Est fidelis fuga', 10)).to.be.a('string');
    });

    it('should trucate the string if its longer than n', function () {
        expect(utils.truncate('Est fidelis fuga', 10)).to.equal('Est fidel...');
    });

    it('should not truncate the string if its size is smaller than n', function () {
        expect(utils.truncate('Est', 10)).to.equal('Est');
    });
});

describe('getUnique() method', function () {
    "use strict";

    var arr = [1, 3, 'a', 'a', 1, 5];
    it('should return an array', function () {
        expect(utils.getUnique(arr)).to.be.a('Array');
    });

    it('should return an array of unique values', function () {
        expect(utils.getUnique([1, 3, 'a', 'a', 1, 5])).to.eql([1, 3, 'a', 5]);
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
        expect(utils.deepExtend(defaults, opts)).to.eql(expected);
    });

    it('should return an object', function () {
        expect(utils.deepExtend(opts, defaults)).to.be.a('object');
    });
});

describe('escapeRegExp() method', function () {
    "use strict";

    var x = ':):/';
    it('should return a valid regex pattern', function () {
        var reg = new RegExp(utils.escapeRegExp(x), 'g');
        expect(x).to.match(reg);
    });
});

describe('sortObject() method', function () {
    "use-strict";

    var input = [{
        index: 3,
        name: 'foo'
    }, {
        index: 1,
        name: 'bar'
    }, {
        index: 2,
        name: 'john'
    }];

    var result = [{
        index: 1,
        name: 'bar'
    }, {
        index: 2,
        name: 'john'
    }, {
        index: 3,
        name: 'foo'
    }];

    it('should return a sorted array based on the value of index in each object', function () {
        expect(utils.sortObject(input)).to.eql(result);
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
        expect(utils.createText(str, embeds)).to.be.a("string");
    });

    it('should return a string after concatenating the embeds in correct order', function () {
        expect(utils.createText(str, embeds)).to.equal('This is embed.js bar john foo');
    });
});

describe('matches() method', function () {
    var regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
    var input = 'The documentation is available at http://someurl.jpg';
    var match = utils.matches(regex, input);
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
        expect(utils.ifEmbed(options, 'everything')).to.be.true;
    });

    it('should return false if the service is not excluded', function () {
        expect(utils.ifEmbed(options, 'something')).to.be.false;
    });
});

describe('dimensions() method', function () {

    it('should return the height 450 if height is 600 and vice versa', function () {
        var options = {
            videoWidth: 600,
            videoHeight: null
        };

        var result = {
            height: 450,
            width: 600
        };

        expect(utils.dimensions(options)).to.eql(result);

        var options2 = {
            videoHeight: 450,
            videoWidth: null
        };

        expect(utils.dimensions(options2)).to.eql(result);
    });
});

describe('urlRegex() method', function () {
    it('should return a regex', function () {
        expect(utils.urlRegex()).to.be.an.instanceof(RegExp);
    });

    it('should match url like http://rkritesh.com/embed.js', function () {
        expect('http://rkritesh.com/embed.js').to.match(utils.urlRegex());
    });

    it('should match url like ftp://something.com', function () {
        expect('ftp://something.com').to.match(utils.urlRegex());
    });
});