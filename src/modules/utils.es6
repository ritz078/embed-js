var utils = {

    /**
     * Trucates the string and adds ellipsis at the end.
     * @param string        The string to be truncated
     * @param n             Length to which it should be truncated
     * @returns {string}    The truncated string
     */
    truncate: (string, n)=> {
        return string.substr(0, n - 1) + (string.length > n ? '...' : '');
    },

    /**
     * Returns an array after removing the duplicates.
     * @param array         The array containing the duplicates
     * @returns {Array}     Array with unique values.
     */
    getUnique: (array)=> {
        var u = {}, a = [];

        array.forEach((value)=> {
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
    toUrl: (string)=> {
        var url;
        if (string.indexOf('//') == -1) {
            url = '//' + string;
        } else {
            url = string;
        }
        return url;
    },

	/**
	 * Extends an Object
	 * @param destination
	 * @param source
	 * @returns {*}
     */
	deepExtend: function(destination, source){
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

	escapeRegExp: function(str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	},

    /**
     * Sort an array of objects based on the index value
     * @param  {Array} arr Array to be sorted
     * @return {Array}     Sorted array
     */
    sortObject: function(arr){
        return arr.sort((a,b)=>(a.index - b.index));
    },

    createText: function(str, embeds){
        let sortedEmbeds = this.sortObject(embeds);
        for(let embed of sortedEmbeds){
            str += ` ${embed.text}`;
        }
        return str;
    },

    matches: function(regex, input){
        return regex.exec(input);
    },

    ifEmbed: function(options, service){
        return ((options.excludeEmbed.indexOf(service) == -1) && (options.excludeEmbed !== 'all'));
    },

    dimensions: (options) => {
        let dimensions = {
            width: options.videoWidth,
            height: options.videoHeight
        };
        if (options.videoHeight && options.videoWidth) {
            return dimensions;
        } else if (options.videoHeight) {
            dimensions.width = ((options.videoHeight) / 390) * 640;
            return dimensions;
        } else if (options.videoWidth) {
            dimensions.height = ((dimensions.width) / 640) * 390;
            return dimensions;
        } else {
            [dimensions.width, dimensions.height] = [640, 390];
            return dimensions;
        }
    }
};

module.exports = utils;
