class Highlight {
    constructor(input, options) {
        if (!hljs) {
            throw new ReferenceError(
                `'hljs is not defined. HighlightJS library is needed to highlight code. Visit https://highlightjs.org/'`
            );
        }
        this.input = input;
        this.options = options;
    }

    /**
     * Encodes the characters like <, > and space and replaces them with
     * &lt;, &gt; and &gt; respectively.
     * @param  {string} code The string that has to be encoded.
     * @return {string}      The encoded string
     */
    encode(code) {
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
    trimSpace(code) {
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
    addTemplate(processedCode, language){
        let template =
        `<pre>
            <code class="ejs-code hljs ${language}">${processedCode.value}</code>
        </pre>
        `;
        return template;
    }

    process() {
        let regex = /(`+)(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm;
        let input = this.input.replace(regex, (match, group1, group2, group3) => {
            let code = group3;
            code = this.trimSpace(code);
            code = this.encode(code);

            // to prevent auto-linking. Not necessary in code
            // *blocks*, but in code spans. Will be converted
            // back after the auto-linker runs.
            code = code.replace(/:\/\//g, '~P');

            let language = group2.split('\n')[0];
            let highlightedCode;

            if (language) {
                highlightedCode = hljs.highlightAuto(code, [language]);
            } else {
                highlightedCode = hljs.highlightAuto(code);
                language = highlightedCode.language;
            }

            return this.addTemplate(highlightedCode, language);

        });
        return input;
    }
}

module.exports = Highlight;
