import utils from './utils.es6'

export default class OpenGraph{
	constructor(input, output, options, embeds){
		this.input   = input;
		this.output  = output;
		this.options = options;
		this.embeds  = embeds;
		this.urlRegex = utils.urlRegex();
	}

	template(data){
		return `<div class="ejs-embed ejs-ogp">
		<div class="ejs-ogp-thumb" style="background-image:url(${data.image})"></div>
		<div class="ejs-ogp-details">
			<div class="ejs-ogp-title"><a href="${data.url}" target="${this.options.linkOptions.target}">${data.title}</a></div>
			<div class="ejs-ogb-details">${data.description}</div>
		</div>
		</div>`
	}

	async fetchData(){
		let url = 'https://housing.com'
		let config = this.options.openGraphOptions;
		let api = `https://opengraph.io/api/1.0/site/${encodeURI(url)}?cache_ok=${config.forceCache}`
		if (config.opengraphIoId) api += `app_id=${config.opengraphIoId}`
		if (config.apiEndpoint) api = config.apiEndpoint
		let response = await fetch(api);
		return await response.json();
	}

	async process(){
		let data = await this.fetchData();
		this.output = this.output + this.template(data.hybridGraph);
		return [this.output, this.embeds]
	}
}
