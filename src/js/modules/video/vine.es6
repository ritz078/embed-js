import Base from '../base.es6'

export default class Vine extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /vine.co\/v\/[a-zA-Z0-9]+/gi;
        this.service = 'vine'
    }

    template(match) {
        let a = match.split('/')
        const id = a[a.length - 1]
        return this.options.template.vine(id, this.options)
    }
}

