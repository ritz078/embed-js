export default class Markdown {
	constructor(output, options) {
		if (!options.plugins.marked) throw new ReferenceError(`marked.js is not loaded.`);
		this.output  = output;
		this.options = options;
	}

	process() {
		const Marked = this.options.plugins.marked;
		let renderer = new Marked.Renderer();

		renderer.link = (href, title, text) => {
			if (href.indexOf('&lt;/a') === -1) return href;
			if (href.match(/&gt;(.+)&lt;\/a/gi)) {
				if (!title) title = '';
				return `<a href="${RegExp.$1}" rel=${this.options.linkOptions.rel}" target="${this.options.linkOptions.target}" title="${title}">${text}</a>`
			}
		};

		renderer.image = (href, title, text) => {
			if (href.indexOf('&lt;/a') === -1) return href;
			if (href.match(/&gt;(.+)&lt;\/a/gi)) {
				if (!title) title = '';
				return `<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="${RegExp.$1}" title="${title}" alt="${text}"/></div></div>`
			}
		};

		renderer.paragraph = (text) => `<p> ${text} </p>`; //for font smiley in end.

		//Fix for heading that should be actually present in marked.js
		//if gfm is true the `## Heading` is acceptable but `##Heading` is not
		Marked.Lexer.rules.gfm.heading    = Marked.Lexer.rules.normal.heading;
		Marked.Lexer.rules.tables.heading = Marked.Lexer.rules.normal.heading;

		this.options.markedOptions.renderer = renderer;
		this.options.markedOptions.highlight = false;
		return Marked(this.output, this.options.markedOptions)
	}
}
