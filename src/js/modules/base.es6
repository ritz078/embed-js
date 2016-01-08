import { ifInline, matches } from './utils.es6'

class Base {
    constructor(input, output, options, embeds) {
        this.input = input;
        this.output = output;
        this.options = options;
        this.embeds = embeds;
    }

    process() {
        if (!ifInline(this.options, this.service)) {
            let regexInline = this.options.link ? new RegExp(`([^>]*${this.regex.source})<\/a>`, 'gm') : new RegExp(`([^\\s]*${this.regex.source})`, 'gm');
            this.output = this.output.replace(regexInline, (match) => {
                let url = this.options.link ? match.slice(0, -4) : match;
                if (this.options.served.indexOf(url) === -1) {
                    this.options.served.push(url);
                    if (this.options.link) {
                        return !this.options.inlineText ? this.template(match.slice(0, -4)) + '</a>' : match + this.template(match.slice(0, -4))
                    } else {
                        return !this.options.inlineText ? this.template(match) : match + this.template(match)
                    }
                } else {
                    return url;
                }
            })
        } else {
            let match;
            while ((match = matches(this.regex, this.input)) !== null) {
                if (this.options.served.indexOf(match[0]) === -1) {
                    let text = this.template(match[0]);
                    this.embeds.push({
                        text: text,
                        index: match.index
                    })
                }
            }
        }
        return [
            this.output,
            this.embeds
        ];
    }
}

export default Base
