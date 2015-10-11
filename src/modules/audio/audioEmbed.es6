import utils from '../utils.es6';

import SoundCloud from './soundcloud.es6';
import Spotify from './spotify.es6';

class AudioEmbed{
	constructor(input, output, options, embeds) {
		this.input = input;
		this.output = output;
		this.options = options;
		this.embeds = embeds;
	}

	async process(){
		try{
			let output = this.output;
			let embeds = this.embeds;
			embeds = utils.ifEmbed(this.options, 'soundcloud') ? await (new SoundCloud(this.input, this.options, embeds).process()) : embeds;
			embeds = utils.ifEmbed(this.options, 'spotify') ? await (new Spotify(this.input, this.options, embeds).process()) : embeds;

			return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = AudioEmbed;

