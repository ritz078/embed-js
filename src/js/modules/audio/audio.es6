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
			let output = this.output;
			let embeds = this.embeds;
			embeds = utils.ifEmbed(this.options, 'soundcloud') && build.SOUNDCLOUD ? (new SoundCloud(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'spotify') && build.SPOTIFY ? (new Spotify(this.input, this.options, embeds).process()) : embeds;
			embeds = this.options.audioEmbed && build.BASICAUDIO ? (new BasicAudio(this.input, this.options, embeds).process()) : embeds;

			return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = Audio;

