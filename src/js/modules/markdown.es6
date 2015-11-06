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
			let highlightedCode = window.hljs ? hljs.highlightAuto(text) : {value:text}
			let language = window.hljs ? highlightedCode.language : ''
			let template =`<pre><code class="ejs-code hljs ${language}">${highlightedCode.value}</code></pre>`;
			return template
		}
		this.options.markedOptions.renderer = renderer
		let output = marked(this.output, this.options.markedOptions)
		return output
	}
}

module.exports = Markdown
