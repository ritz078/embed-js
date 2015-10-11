import utils from '../utils.es6';

import Ted from './ted.es6';

class VideoEmbed {
    constructor(input, output, options, embeds) {
        this.input = input;
        this.output = output;
        this.options = options;
        this.embeds = embeds;
    }

    async process() {
        try {
            let input = this.input;
            let output = this.output;
            let embeds = this.embeds;
            embeds = utils.ifEmbed(this.options, 'ted') ? await (new Ted(input, this.options, embeds).process()) : output;

            return [output, embeds];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = VideoEmbed
