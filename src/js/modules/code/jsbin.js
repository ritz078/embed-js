import Base from '../base'
import regex from '../regex'

export default class JsBin extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.jsbin;
        this.service = 'jsbin';
    }

    template(id) {
        return this.options.template.jsBin(id, this.options)
    }
}
