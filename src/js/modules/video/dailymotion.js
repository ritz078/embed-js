import Base from '../base'
import regex from '../regex'

export default class Dailymotion extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.dailymotion;
        this.service = 'dailymotion'
    }

    template(match) {
        const a = match.split('/');
        const id = a[a.length - 1];
        return this.options.template.dailymotion(id, this.options)
    }
}

