import utils from '../utils.es6'

export class Gmap {
    constructor(input, output, options, embeds) {
        this.input   = input;
        this.output  = output;
        this.options = options;
        this.embeds  = embeds;
        this.service = 'map';
        this.regex   = /@\((.+)\)/gi
    }

    async getCoordinate(location) {
        let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`;
        let response = await fetch(url);
        let data = await response.json();
        let [latitude, longitude] = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
        return [latitude, longitude]
    }

    template(match, latitude, longitude) {
        let location = match.split('(')[1].split(')')[0];
        let config = this.options.mapOptions;
        const dimensions = utils.dimensions(this.options);
        if (config.mode === 'place') {
            return `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" src="https://www.google.com/maps/embed/v1/place?key=${this.options.googleAuthKey}&q=${location}"></iframe></div>`;
        } else if (config.mode === 'streetview') {
            return `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" src="https://www.google.com/maps/embed/v1/streetview?key=${this.options.googleAuthKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35"></iframe></div>`;
        } else if (config.mode === 'view') {
            return `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" src="https://www.google.com/maps/embed/v1/view?key=${this.options.googleAuthKey}&center=${latitude},${longitude}&zoom=18&maptype=satellite"></iframe></div>`
        }
    }

    static locationText(match){
        return match.split('(')[1].split(')')[0]
    }

    async process() {
        let match;
        while ((match = utils.matches(this.regex, this.output)) !== null) {
            let [latitude, longitude] = this.options.mapOptions.mode !== 'place' ? await this.getCoordinate(match[0]) : [null, null];
            let text = this.template(match[0], latitude, longitude);
            if (!utils.ifInline(this.options, this.service)) {
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

