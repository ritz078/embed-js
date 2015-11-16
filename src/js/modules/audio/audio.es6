import utils from '../utils.es6'

import SoundCloud from './soundcloud.es6'
import Spotify    from './spotify.es6'
import BasicAudio from './basic.es6'

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
			[output,embeds] = utils.ifEmbed(options, 'soundcloud') && SOUNDCLOUD ? (new SoundCloud(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = utils.ifEmbed(options, 'spotify') && SPOTIFY ? (new Spotify(input,output, options, embeds).process()) : [output,embeds];
			[output,embeds] = this.options.audioEmbed && BASICAUDIO ? (new BasicAudio(input,output, options, embeds).process()) : [output,embeds];

			return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

export default Audio

