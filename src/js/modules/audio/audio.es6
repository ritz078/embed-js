const utils = require('../utils.es6');

if(build.SOUNDCLOUD) var SoundCloud = require('./soundcloud.es6');
if(build.SPOTIFY)    var Spotify    = require('./spotify.es6');
if(build.BASICAUDIO) var BasicAudio = require('./basic.es6');

class Audio{
	constructor(input, output, options, embeds) {
		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
	}

	process(){
		try{
			let [input, output, options, embeds] = [this.input, this.output, this.options, this.embeds];
			[output,embeds] = utils.ifEmbed(options, 'soundcloud') && build.SOUNDCLOUD ? (new SoundCloud(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'spotify') && build.SPOTIFY ? (new Spotify(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = this.options.audioEmbed && build.BASICAUDIO ? (new BasicAudio(input,output, options, embeds).process()) : [output,embeds];

			return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = Audio;

