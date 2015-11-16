import utils from '../utils.es6';

import Ted         from './ted.es6'
import Dailymotion from './dailymotion.es6'
import Ustream     from './ustream.es6'
import LiveLeak    from './liveleak.es6'
import Vine        from './vine.es6'
import Youtube     from './youtube.es6'
import Vimeo       from './vimeo.es6'
import BasicVideo  from './basic.es6'

class Video {
    constructor(input, output, options, embeds) {
        this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds
    }

    async process() {
        let [input,output,options,embeds] = [this.input,this.output,this.options,this.embeds];

        [output, embeds] = utils.ifEmbed(options, 'ted') && build.TED ? (new Ted(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = utils.ifEmbed(options, 'dailymotion') && build.DAILYMOTION ? (new Dailymotion(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = utils.ifEmbed(options, 'ustream') && build.USTREAM ? (new Ustream(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = utils.ifEmbed(options, 'liveleak') && build.LIVELEAK ? (new LiveLeak(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = options.videoEmbed && build.BASICVIDEO ? (new BasicVideo(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = utils.ifEmbed(options, 'vine') && build.VINE ? (new Vine(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = utils.ifEmbed(options, 'youtube') && build.YOUTUBE ? await (new Youtube(input, output, options, embeds).process()) : [output, embeds];
        [output, embeds] = utils.ifEmbed(options, 'vimeo') && build.VIMEO ? await (new Vimeo(input, output, options, embeds).process()) : [output, embeds];

        return [output, embeds];
    }
}

export default Video;
