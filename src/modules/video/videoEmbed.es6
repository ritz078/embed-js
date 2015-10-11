import utils       from '../utils.es6';

import Ted         from './ted.es6';
import Dailymotion from './dailymotion.es6';
import Ustream     from './ustream.es6';
import LiveLeak    from './liveleak.es6';
import Vine        from './vine.es6';

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
            embeds = utils.ifEmbed(this.options, 'dailymotion') ? await (new Dailymotion(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'ustream') ? await (new Ustream(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'liveleak') ? await (new LiveLeak(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'vine') ? await (new Vine(input, this.options, embeds).process()) : output;

            return [output, embeds];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = VideoEmbed
