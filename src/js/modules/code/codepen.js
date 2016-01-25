import Base from '../base'
import regex from '../regex'

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

