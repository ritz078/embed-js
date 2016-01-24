import Base from '../base.es6'
import regex from '../regex.es6'

export default class Ideone extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.ideone;
        this.service = 'ideone';
    }

    template(match) {
        return this.options.template.ideone(match, this.options)
    }
}
