import utils     from '../utils.es6';

import Flickr    from './flickr.es6';
import Instagram from './instagram.es6';
import Basic     from './basic.es6';

class Image{
	constructor(input, output, options, embeds){
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
	}

	process(){
		try{
			let input  = this.input;
            let output = this.output;
            let embeds = this.embeds;
            embeds = utils.ifEmbed(this.options, 'flickr') ? (new Flickr(input, this.options, embeds).process()) : output;
            embeds = utils.ifEmbed(this.options, 'instagram') ? (new Instagram(input, this.options, embeds).process()) : output;
            embeds = this.options.imageEmbed ? (new Basic(input, this.options, embeds).process()) : output;

            return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

module.exports = Image;
