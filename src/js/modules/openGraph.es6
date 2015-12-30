import utils from './utils.es6'

export default class OpenGraph {
    constructor(input, output, options, embeds) {
        this.input = input;
        this.output = output;
        this.options = options;
        this.embeds = embeds;
        this.service = 'opengraph'
    }

    template(data) {
        return `<div class="ejs-embed ejs-ogp">
		<div class="ejs-ogp-thumb" style="background-image:url(${data.image})"></div>
		<div class="ejs-ogp-details">
			<div class="ejs-ogp-title"><a href="${data.url}" target="${this.options.linkOptions.target}">${data.title}</a></div>
			<div class="ejs-ogb-details">${data.description}</div>
		</div>
		</div>`
    }

    async fetchData(url) {
        try {
            this.served.push(url)
            url = encodeURIComponent(url)
            let api = new Function('url', 'return `' + this.options.openGraphEndpoint + '`')(url);
            let response = await fetch(api);
            return await response.json()
        } catch (e) {
            return
        }
    }

    async process() {
        let regex = utils.urlRegex()
        let match;
        while ((match = utils.matches(regex, this.input)) !== null) {
            let data = await this.fetchData(match[0]);
            if (data && data.success) {
                let template = this.template(data.hybridGraph || data);
                this.embeds.push({
                    text: template,
                    index: match.index
                })
            }
        }

        return [this.output, this.embeds]
    }
}
