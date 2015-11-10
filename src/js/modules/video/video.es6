const utils = require('../utils.es6');

if(build.TED)         var Ted         = require('./ted.es6');
if(build.DAILYMOTION) var Dailymotion = require('./dailymotion.es6');
if(build.USTREAM)     var Ustream     = require('./ustream.es6');
if(build.LIVELEAK)    var LiveLeak    = require('./liveleak.es6');
if(build.VINE)        var Vine        = require('./vine.es6');
if(build.YOUTUBE)     var Youtube     = require('./youtube.es6');
if(build.VIMEO)       var Vimeo       = require('./vimeo.es6');
if(build.BASICVIDEO)  var BasicVideo  = require('./basic.es6');

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

module.exports = Video;
