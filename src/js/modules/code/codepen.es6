import Base from '../base.es6'

export class CodePen extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
        this.service = 'codepen';
    }

    template(id) {
        return ejs.template.codePen(id, this.options) || `<div class="ejs-embed ejs-codepen">
			<iframe scrolling="no" height="${this.options.codeEmbedHeight}" src="${id.replace(/\/pen\//, '/embed/')}/?height=${this.options.codeEmbedHeight}"></iframe>'
		</div>`
    }
}

