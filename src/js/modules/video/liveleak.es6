import {getDimensions} from '../utils.es6'
import Base from '../base.es6'
import regex from '../regex.es6'

export default class LiveLeak extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.liveleak;
        this.service = 'liveleak'
    }

    template(match) {
        const dimensions = getDimensions(this.options);
        return this.options.template.liveLeak(match, dimensions, this.options)
    }
}
