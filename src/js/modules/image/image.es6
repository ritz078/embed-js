import utils     from '../utils.es6'

import Flickr    from './flickr.es6'
import Instagram from './instagram.es6'
import Basic     from './basic.es6'

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
            [output,embeds] = utils.ifEmbed(this.options, 'flickr') && FLICKR ? (new Flickr(input,output, this.options, embeds).process()) : [output,embeds];
            [output,embeds] = utils.ifEmbed(this.options, 'instagram') && INSTAGRAM ? (new Instagram(input,output, this.options, embeds).process()) : [output,embeds];
            [output,embeds] = this.options.imageEmbed && BASICIMAGE ? (new Basic(input,output, this.options, embeds).process()) : [output,embeds];

            return [output, embeds];
		}catch(error){
			console.log(error);
		}
	}
}

export default Image;
