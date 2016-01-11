import Base from '../base.es6'

export default class JsBin extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
        this.service = 'jsbin';
    }

    template(id) {
        return this.options.template.jsBin(id, this.options)
    }
}
