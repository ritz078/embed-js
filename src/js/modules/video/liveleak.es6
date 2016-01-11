import {getDimensions} from '../utils.es6'
import Base from '../base.es6'

export default class LiveLeak extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
        this.service = 'liveleak'
    }

    template(match) {
        const dimensions = getDimensions(this.options);
        return this.options.template.liveLeak(match, dimensions, this.options)
    }
}
