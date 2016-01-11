import Base from '../base.es6'

export default class Plunker extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
        this.service = 'plunker'
    }

    template(match) {
        let a = match.split('?')[0].split('/');
        const id = a[a.length - 1];
        return this.options.template.plunker(id, this.options)
    }
}

