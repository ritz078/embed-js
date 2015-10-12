import utils from './utils.es6';

class Base{
	constructor(input,options, embeds){
		this.input = input;
		this.options = options;
		this.embeds = embeds;
	}

    dimensions() {
        let options = this.options;
        let dimensions = {
            width: options.videoWidth,
            height: options.videoHeight
        };
        if (options.videoHeight && options.videoWidth) {
            return dimensions;
        } else if (options.videoHeight) {
            dimensions.width = ((options.videoHeight) / 390) * 640;
            return dimensions;
        } else if (options.videoWidth) {
            dimensions.height = ((dimensions.width) / 640) * 390;
            return dimensions;
        } else {
            [dimensions.width, dimensions.height] = [640, 390];
            return dimensions;
        }
    }

	process(){
		let match;
		while((match = utils.matches(this.regex, this.input)) !== null){
			let text = this.template(match[0]);
			this.embeds.push({
				text : text,
				index : match.index
			})
		}
		return this.embeds;
	}
}

module.exports = Base;
