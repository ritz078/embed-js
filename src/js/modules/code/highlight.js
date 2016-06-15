import regex from '../regex'

/**
 * Encodes the characters like <, > and space and replaces them with
 * &lt;, &gt; and &gt; respectively.
 * @param  {string} code The string that has to be encoded.
 * @return {string}      The encoded string
 */
function encode(code) {
	code = code.replace(/&amp;/gm, '');
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	return code;
}

/**
 * removes whitespace characters
 * @param  {string} code The string from which the whitespace has to be removed
 * @return {string}
 */
function trimSpace(code) {
	code = code.replace(/^([ \t]*)/g, ''); // leading whitespace
	code = code.replace(/[ \t]*$/g, ''); // trailing whitespace
	return code;
}


/**
 * Places the code and the language name in the required template
 * @param {string} processedCode
 * @param {string} language
 * @return {string}
 */
function addTemplate(processedCode, language) {
	return `<pre><code class="ejs-code hljs ${language}">${processedCode.value || processedCode}</code></pre>`
}


/**
 * Replaces the code block with the pre tags and returns a string having the code
 * formatting using Highlight.js.
 * => Matches the string with the regex and finds the code written in three back-ticks ```
 * => Detects whether any language has been provided by the user.
 *     The format supported by embed.js is
 *         ```[language-name]
 *         var a = 2;
 *         ```
 * => Trims all the unnecessary spaces and newlines from the code.
 * => Passes the code to `hljs.highlightAuto(code, language)` which returns a formatted string
 *     having the html tags for styling. The `language` here is optional. In case we don't pass the
 *     language, it tries to detect the language itself.
 * => Replaces the code string in the template with the formatted string
 * @return {string} The string in which the code is formatted
 */
export default function (output, options) {
	output = output.replace(regex.inlineCode, function (match, group1, group2) {
		return `<code>${group2}</code>`
	});

	return output.replace(regex.highlightCode, (match, group1, group2, group3) => {
		let code = group3;
		code     = trimSpace(code);
		code     = encode(code);

		// to prevent auto-linking. Not necessary in code
		// *blocks*, but in code spans. Will be converted
		// back after the auto-linker runs.
		code = code.replace(/:\/\//g, '~P');

		let language = group2.split('\n')[0];
		let highlightedCode;

		const HighlightJS = options.plugins.highlightjs;
		if (language) {
			highlightedCode = HighlightJS.highlightAuto(code, [language]);
		} else {
			highlightedCode = HighlightJS.highlightAuto(code);
			language        = highlightedCode.language;
		}

		return addTemplate(highlightedCode, language);
	});
}
