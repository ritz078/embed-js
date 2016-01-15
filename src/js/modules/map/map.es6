import { ifInline, matches, getDimensions } from '../utils.es6'

export default class Gmap {
    constructor(input, output, options, embeds) {
        this.input   = input;
        this.output  = output;
        this.options = options;
        this.embeds  = embeds;
        this.service = 'map';
        this.regex   = /@\((.+)\)/gi
    }

    /**
     * Takes the location name and returns the coordinates of that location using the Google
     * Map API v3. This is an async function so it will return a promise.
     * @param  {string} location The name of any location
     * @return {array}           Returns an array in the form [latitude, longitude]
     */
    static async getCoordinate(location) {
        let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`;
        let response = await fetch(url);
        let data = await response.json();
        return [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
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
    static template(match, latitude, longitude, options) {
        let location = Gmap.locationText(match);
        let config = options.mapOptions;
        const dimensions = getDimensions(options);
        if (config.mode === 'place') {
            return `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" src="https://www.google.com/maps/embed/v1/place?key=${options.googleAuthKey}&q=${location}"></iframe></div>`;
        } else if (config.mode === 'streetview') {
            return `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" src="https://www.google.com/maps/embed/v1/streetview?key=${options.googleAuthKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35"></iframe></div>`;
        } else if (config.mode === 'view') {
            return `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" src="https://www.google.com/maps/embed/v1/view?key=${options.googleAuthKey}&center=${latitude},${longitude}&zoom=18&maptype=satellite"></iframe></div>`
        }
    }

    /**
     * Extracts out the location name from the format @(locationName)
     * @param  {string} match The string in the supported format. Eg : @(Delhi)
     * @return {string}       Only the location name removing @ and brackets. Eg: Delhi
     */
    static locationText(match){
        return match.split('(')[1].split(')')[0]
    }

    async process() {
        let match;
        while ((match = matches(this.regex, this.output)) !== null) {
            let [latitude, longitude] = this.options.mapOptions.mode !== 'place' ? await Gmap.getCoordinate(match[0]) : [null, null];
            let text = Gmap.template(match[0], latitude, longitude, this.options);
            if (!ifInline(this.options, this.service)) {
                this.output = this.output.replace(this.regex, (regexMatch) => {
                    return `<span class="ejs-location">${Gmap.locationText(regexMatch)}</span>${text}`
                })
            } else {
                this.embeds.push({
                    text: text,
                    index: match.index
                });
                this.output = this.output.replace(this.regex, (regexMatch) => {
                    return `<span class="ejs-location">${Gmap.locationText(regexMatch)}</span>`
                });
            }
        }

        return [this.output, this.embeds];
    }
}

