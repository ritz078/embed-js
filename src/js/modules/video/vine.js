import Base from '../base'
import regex from '../regex'
import { lastElement } from '../utils'

export default class Vine extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.vine;
        this.service = 'vine'
    }

    template(match) {
        const id = lastElement(match.split('/'));
        return this.options.template.vine(id, this.options)
    }
}

