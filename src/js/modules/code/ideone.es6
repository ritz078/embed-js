import Base from '../base.es6'

export class Ideone extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
        this.service = 'ideone';
    }

    template(match) {
        return ejs.template.ideone(match, this.options) || `<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/${match.split('/')}" frameborder="0" height="${this.options.codeEmbedHeight}"></iframe></div>`
    }
}
