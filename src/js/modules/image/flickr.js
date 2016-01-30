import Base from '../base'
import regex from '../regex'

export default class Flickr extends Base{
	constructor(input, output,options, embeds){
		super(input,output, options, embeds);
		this.regex = regex.flickr;
		this.service = 'flickr'
	}

	template(match){
		return this.options.template.flickr(match, this.options);
	}
}

