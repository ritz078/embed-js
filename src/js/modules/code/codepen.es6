import Base from '../base.es6'
import regex from '../regex.es6'

export default class CodePen extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.codepen;
        this.service = 'codepen';
    }

    template(id) {
        return this.options.template.codePen(id, this.options)
    }
}

