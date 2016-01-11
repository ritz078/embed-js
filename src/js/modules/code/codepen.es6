import Base from '../base.es6'

export default class CodePen extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
        this.service = 'codepen';
    }

    template(id) {
        return this.options.template.codePen(id, this.options)
    }
}

