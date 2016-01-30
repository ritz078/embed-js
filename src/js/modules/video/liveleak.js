import Base from '../base'
import regex from '../regex'

export default class LiveLeak extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.liveleak;
        this.service = 'liveleak'
    }

    template(match) {
        return this.options.template.liveLeak(match, this.options)
    }
}
