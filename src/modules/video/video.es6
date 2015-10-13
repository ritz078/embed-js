import utils       from '../utils.es6';

import Ted         from './ted.es6';
import Dailymotion from './dailymotion.es6';
import Ustream     from './ustream.es6';
import LiveLeak    from './liveleak.es6';
import Vine        from './vine.es6';
import Youtube     from './youtube.es6';
import Vimeo       from './vimeo.es6';

class Video {
    constructor(input, output, options, embeds) {
        this.input   = input;
        this.output  = output;
        this.options = options;
        this.embeds  = embeds;
    }

    async process() {
        try {
            let input  = this.input;
            let output = this.output;
            let embeds = this.embeds;
            embeds = utils.ifEmbed(this.options, 'ted') ? (new Ted(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'dailymotion') ? (new Dailymotion(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'ustream') ? (new Ustream(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'liveleak') ? (new LiveLeak(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'vine') ? (new Vine(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'youtube') ? await (new Youtube(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'vimeo') ? await (new Vimeo(input, this.options, embeds).process()) : output;


            return [output, embeds];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Video;
