import { getDimensions } from '../utils.es6'
import Base from '../base.es6'
import regex from '../regex.es6'

export default class Ustream extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.ustream;
        this.service = 'ustream'
    }

    template(match) {
        let id = match.split('/');
        id.splice(1, 0, 'embed');
        const dimensions = getDimensions(this.options);
        return this.options.template.ustream(id, dimensions, this.options)
    }
}
