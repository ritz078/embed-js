import utils from '../utils.es6'
import Base from '../base.es6'

export class Ted extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
        this.service = 'ted'
    }

    template(match) {
        const dimensions = utils.dimensions(this.options);
        let a = match.split('/');
        const id = a[a.length - 1];
        return ejs.template.ted(id, dimensions, this.options) || `<div class="ejs-embed ejs-ted"><iframe src="http://embed.ted.com/talks/${id}.html" height="${dimensions.height}" width="${dimensions.width}"></iframe></div>`
    }
}
