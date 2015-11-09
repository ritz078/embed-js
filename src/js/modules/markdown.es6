class Markdown {
	constructor(output, options) {
		if (!window.marked) {
			throw new ReferenceError(
				`marked.js is not loaded.`
				)
		}
		this.output = output
		this.options = options
	}

	process() {
		let renderer = new marked.Renderer()
		renderer.code = function(text) {
			let highlightedCode = window.hljs ? hljs.highlightAuto(text) : {
				value: text
			}
			let language = window.hljs ? highlightedCode.language : ''
			let template = `<pre><code class="ejs-code hljs ${language}">${highlightedCode.value}</code></pre>`;
			return template
		}
		renderer.link = (text,title,link) => {
			if (text.indexOf('&lt;/a') === -1) return text
			if (text.match(/&gt;(.+)&lt;\/a/gi)){
				return `<a href="${RegExp.$1}" rel=${this.options.linkOptions.rel}" target="${this.options.linkOptions.target}" title="${title}">${link}</a>`
			}
		}
        renderer.paragraph = (text) => `<p> ${text} </p>` //for font smiley in end.
        this.options.markedOptions.renderer = renderer
        let output = marked(this.output, this.options.markedOptions)
        return output
    }
}

module.exports = Markdown
