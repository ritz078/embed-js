import utils from '../utils.es6';

import SoundCloud from './soundcloud.es6';
import Spotify from './spotify.es6';
import BasicAudio from './basic.es6';

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
			embeds = utils.ifEmbed(this.options, 'soundcloud') ? (new SoundCloud(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'spotify') ? (new Spotify(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'basic-audio') ? (new BasicAudio(this.input, this.options, embeds).process()) : embeds;

			return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = Audio;

