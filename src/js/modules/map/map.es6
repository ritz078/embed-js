const utils = require('../utils.es6');

class Gmap {
    constructor(input, output, options, embeds) {
        this.input = input;
        this.output = output;
        this.options = options;
        this.embeds = embeds;
        this.regex = /@\((.+)\)/gi;
    }

    async getCoordinate(location) {
        let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        let [latitude, longitude] = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
        return [latitude, longitude]
    }

    template(match, latitude, longitude) {
        let template;
        let location = match.split('(')[1].split(')')[0];
        let config = this.options.mapOptions;
        let dimensions = utils.dimensions(this.options);
        if (config.mode === 'place') {
            template =
                `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=${this.options.googleAuthKey}&q=${location}"></iframe></div>`;
        } else if (config.mode === 'streetview') {
            template =
                `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/streetview?key=${this.options.googleAuthKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35"></iframe></div>`;
        } else if (config.mode === 'view') {
            template =
                `<div class="ejs-embed ejs-map"><iframe width="${dimensions.width}" height="${dimensions.height}" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?key=${this.options.googleAuthKey}&center=${latitude},${longitude}&zoom=18&maptype=satellite"></iframe></div>`
        }
        return template;
    }

    async process() {
        let match;
        while ((match = utils.matches(this.regex, this.input)) !== null) {
            let [latitude, longitude] = this.options.mapOptions.mode !== 'place' ? await this.getCoordinate(match[0]) : [null, null];
            let text = this.template(match[0], latitude, longitude);
            this.embeds.push({
                text: text,
                index: match.index
            })
        }
        this.output = this.output.replace(this.regex, function(match) {
            return '<span class="ejs-location">' + match.split('(')[1].split(')')[0] + '</span>';
        });
        return [this.output, this.embeds];
    }
}

module.exports = Gmap;
