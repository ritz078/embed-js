import Base from '../base'
import regex from '../regex'

export default class Ted extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.ted;
        this.service = 'ted'
    }

    template(match) {
        let a = match.split('/');
        const id = a[a.length - 1];
        return this.options.template.ted(id, this.options)
    }
}
