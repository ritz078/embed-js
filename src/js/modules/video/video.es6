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
        this.input   = input;
        this.output  = output;
        this.options = options;
        this.embeds  = embeds;
    }

    async process() {
        let input  = this.input;
        let output = this.output;
        let embeds = this.embeds;
        embeds = utils.ifEmbed(this.options, 'ted') && build.TED ? (new Ted(input, this.options, embeds).process()) : embeds;
        embeds = utils.ifEmbed(this.options, 'dailymotion') && build.DAILYMOTION ? (new Dailymotion(input, this.options, embeds).process()) : embeds;
        embeds = utils.ifEmbed(this.options, 'ustream') && build.USTREAM ? (new Ustream(input, this.options, embeds).process()) : embeds;
        embeds = utils.ifEmbed(this.options, 'liveleak') && build.LIVELEAK ? (new LiveLeak(input, this.options, embeds).process()) : embeds;
        embeds = this.options.videoEmbed && build.BASICVIDEO ? (new BasicVideo(input, this.options, embeds).process()) : embeds;
        embeds = utils.ifEmbed(this.options, 'vine') && build.VINE ? (new Vine(input, this.options, embeds).process()) : embeds;
        embeds = utils.ifEmbed(this.options, 'youtube') && build.YOUTUBE ? await (new Youtube(input, this.options, embeds).process()) : embeds;
        embeds = utils.ifEmbed(this.options, 'vimeo') && build.VIMEO ? await (new Vimeo(input, this.options, embeds).process()) : embeds;

        return [output, embeds];
    }
}

module.exports = Video;
