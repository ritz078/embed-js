import Base from '../base.es6'

export class JsFiddle extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
        this.service = 'jsfiddle';
    }

    template(id) {
        return ejs.template.jsFiddle(id, this.options) || `<div class="ejs-embed ejs-jsfiddle"><iframe height="${this.options.codeEmbedHeight}" src="http://${id}/embedded"></iframe></div>`
    }
}

