import Base from '../base.es6'
import regex from '../regex.es6'

export default class Vine extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.vine;
        this.service = 'vine'
    }

    template(match) {
        let a = match.split('/');
        const id = a[a.length - 1];
        return this.options.template.vine(id, this.options)
    }
}

