import Base from '../base'
import regex from '../regex'
import { lastElement } from '../utils'

export default class Dailymotion extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.dailymotion;
        this.service = 'dailymotion'
    }

    template(match) {
        const id = lastElement(match.split('/'));
        return this.options.template.dailymotion(id, this.options)
    }
}

