import Base from '../base'
import regex from '../regex'

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
