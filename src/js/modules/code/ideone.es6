import Base from '../base.es6'

export default class Ideone extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
        this.service = 'ideone';
    }

    template(match) {
        return this.options.template.ideone(match, this.options)
    }
}
