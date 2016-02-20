import { ifInline, matches } from '../utils'
import regex from '../regex'
import 'whatwg-fetch'

export default class Gmap {
    constructor(input, output, options, embeds) {
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
    static getCoordinate(location) {
        let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`;
        return new Promise((resolve) => {
            fetch(url)
                .then((data) => data.json())
                .then((json) => resolve([json.results[0].geometry.location.lat, json.results[0].geometry.location.lng]))
        })
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
        if (config.mode === 'place') {
            return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/place?key=${options.googleAuthKey}&q=${location}"></iframe></div>`;
        } else if (config.mode === 'streetview') {
            return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/streetview?key=${options.googleAuthKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35"></iframe></div>`;
        } else if (config.mode === 'view') {
            return `<div class="ejs-embed ejs-map"><iframe width="${options.videoWidth}" height="${options.videoHeight}" src="https://www.google.com/maps/embed/v1/view?key=${options.googleAuthKey}&center=${latitude},${longitude}&zoom=18&maptype=satellite"></iframe></div>`
        }
    }

    /**
     * Extracts out the location name from the format @(locationName)
     * @param  {string} match The string in the supported format. Eg : @(Delhi)
     * @return {string}       Only the location name removing @ and brackets. Eg: Delhi
     */
    static locationText(match) {
        return match.split('(')[1].split(')')[0]
    }

    process() {
        let match, promises = [],
            allMatches = [];
        while ((match = matches(this.regex, this.output)) !== null) {
            this.options.served.push(match);
            let promise = this.options.mapOptions.mode !== 'place' ? Gmap.getCoordinate(match[0]) : Promise.resolve([null, null]);
            promises.push(promise);
            allMatches.push(match)
        }

        return new Promise((resolve) => {
            Promise.all(promises).then((coordinatesArr) => {
                for (var i in promises) {
                    let [latitude, longitude] = coordinatesArr[i];
                    let text = Gmap.template((allMatches[i])[0], latitude, longitude, this.options);
                    if (ifInline(this.options, this.service)) {
                        this.output = this.output.replace(this.regex, (regexMatch) => {
                            return `<span class="ejs-location">${Gmap.locationText(regexMatch)}</span>${text}`
                        })
                    } else {
                        this.embeds.push({
                            text: text,
                            index: allMatches[i][0].index
                        });
                        this.output = this.output.replace(this.regex, (regexMatch) => {
                            return `<span class="ejs-location">${Gmap.locationText(regexMatch)}</span>`
                        });
                    }
                }
                resolve([this.output, this.embeds])
            })
        })
    }
}
