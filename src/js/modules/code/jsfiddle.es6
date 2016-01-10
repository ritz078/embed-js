import Base from '../base.es6'

export default class JsFiddle extends Base {
	constructor(input, output, options, embeds) {
		super(input, output, options, embeds);
		this.regex   = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_\/]+/gi;
		this.service = 'jsfiddle';
	}

	template(id) {
		id = id[id.length - 1] == '/' ? id.slice(0, - 1) : id;
		id =  (id.indexOf('//') !== -1) ? id : `//${id}`;
		return ejs.template.jsFiddle(id, this.options) || `<div class="ejs-embed ejs-jsfiddle"><iframe height="${this.options.codeEmbedHeight}" src="${id}/embedded"></iframe></div>`
	}
}

