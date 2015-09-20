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
		for (let property in source) {
			if (source[property] && source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	}

};

module.exports = utils;
