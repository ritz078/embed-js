var utils = {

    /**
     * Trucates the string and adds ellipsis at the end.
     * @param string        The string to be truncated
     * @param n             Length to which it should be truncated
     * @returns {string}    The truncated string
     */
    truncate: (string, n) => {
        return string.substr(0, n - 1) + (string.length > n ? '...' : '');
    },

    /**
     * Returns an array after removing the duplicates.
     * @param array         The array containing the duplicates
     * @returns {Array}     Array with unique values.
     */
    getUnique: (array) => {
        var u = {},
            a = [];

        array.forEach((value) => {
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
    toUrl: (string) => {
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

    escapeRegExp: (str) => {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    },

    /**
     * Sort an array of objects based on the index value
     * @param  {Array} arr Array to be sorted
     * @return {Array}     Sorted array
     */
    sortObject: (arr) => {
        return arr.sort((a, b) => (a.index - b.index));
    },

    /**
     * Creates the string of the iframes after sorting them and finally returning a string
     * @param  {sring} str    String to which the created text has to be added
     * @param  {object} embeds Sorted array of iframe html
     * @return {string}        String to be rendered
     */
    createText: function(str, embeds){
        let sortedEmbeds = this.sortObject(embeds);
        for (let embed of sortedEmbeds) {
            str += ` ${embed.text}`;
        }
        return str;
    },

    /**
     * Matches the string and finds the substrings matching to the provided regex pattern
     * @param  {object} regex Regex pattern
     * @param  {string} input The string to be analyzed
     * @return {object}       Returns the matched substring with their corresponding positions
     */
    matches: (regex, input) => {
        return regex.exec(input);
    },

    /**
     * Checks wheteher a particular service should be embedded or no based on
     * the setting provided by the user
     * @param  {object} options The options provided by the user
     * @param  {string} service Name of the service for which the condition is to be analyzed
     * @return {boolean}        True if it should be embedded
     */
    ifEmbed: function(options, service) {
        return ((options.excludeEmbed.indexOf(service) == -1) && (options.excludeEmbed !== 'all'));
    },

    /**
     * Calculates the dimensions for the elements based on a aspect ratio
     * @param  {object} options Plugin options
     * @return {object}         The width and height of the elements
     */
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
