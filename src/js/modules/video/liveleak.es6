import utils from '../utils.es6'
import Base from '../base.es6'

export class LiveLeak extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
        this.service = 'liveleak'
    }

    template(match) {
        const dimensions = utils.dimensions(this.options);
        return ejs.template.liveLeak(match, dimensions, this.options) || `<div class="ejs-video ejs-embed"><iframe src="http://www.liveleak.com/e/${match.split('=')[1]}" height="${dimensions.height}" width="${dimensions.width}"></iframe></div>`
    }
}
