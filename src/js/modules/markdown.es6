export class Markdown {
	constructor(output, options) {
		if (!window.marked) throw new ReferenceError(`marked.js is not loaded.`);
		this.output  = output;
		this.options = options;
		this.process()
	}

	process() {
		let renderer = new marked.Renderer();

		/**
		 * Change the default template of the code blocks provided by marked.js
		 * @param  {string} text The code block string
		 * @return {string}      the new template
		 */
		renderer.code = function (text) {
			let highlightedCode = window.hljs ? hljs.highlightAuto(text) : {
				value: text
			};
			let language        = window.hljs ? highlightedCode.language : '';
			return `<pre><code class="ejs-code hljs ${language}">${highlightedCode.value}</code></pre>`
		};

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
		marked.Lexer.rules.gfm.heading    = marked.Lexer.rules.normal.heading;
		marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

		this.options.markedOptions.renderer = renderer;
		return marked(this.output, this.options.markedOptions)
	}
}
