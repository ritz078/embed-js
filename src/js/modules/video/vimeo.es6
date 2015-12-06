import utils from '../utils.es6'
import helper from './helper.es6'
import '../../vendor/fetch.js'


export class Vimeo {
    constructor(input, output, options, embeds) {
        this.input = input;
        this.output = output;
        this.options = options;
        this.embeds = embeds;
        this.regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;
        this.service = 'vimeo'
    }

    static formatData(data, utils) {
        return {
            title          : data.title,
            thumbnail      : data.thumbnail_medium,
            rawDescription : data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
            views          : data.stats_number_of_plays,
            likes          : data.stats_number_of_likes,
            description    : utils.truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
            url            : data.url,
            id             : data.id,
            host           : 'vimeo'
        }
    }

    async data(id) {
        try {
            let url      = `https://vimeo.com/api/v2/video/${id}.json`;
            let response = await fetch(url);
            let data     = await response.json();
            return data[0];
        } catch (error) {
            console.log(error);
        }

    }

    async process() {
        try {
            if (!utils.ifInline(this.options, this.service)) {
                let regexInline = this.options.link ? new RegExp(`([^>]*${this.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${this.regex.source})`, 'gi');
                let match;
                while ((match = utils.matches(regexInline, this.output)) !== null) {
                    let id = this.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
                    let embedUrl = `https://player.vimeo.com/video/${id}`;
                    let data, text;
                    if (this.options.videoDetails) {
                        data = await this.data(id);
                        text = helper.getDetailsTemplate(Vimeo.formatData(data, utils),data, embedUrl)
                    } else {
                        text = helper.template(embedUrl, this.options)
                    }

                    if (this.options.link) {
                        this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text)
                    } else {
                        this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text)
                    }
                }
            } else {
                let match;
                while ((match = utils.matches(this.regex, this.input)) !== null) {
                    let embedUrl = `https://player.vimeo.com/video/${match[3]}`;
                    let data, text;
                    if (this.options.videoDetails) {
                        data = await this.data(match[3]);
                        text = helper.getDetailsTemplate(Vimeo.formatData(data, utils),data, embedUrl)
                    } else {
                        text = helper.template(embedUrl, this.options);
                    }

                    this.embeds.push({
                        text: text,
                        index: match.index
                    })
                }
            }

            return [this.output, this.embeds];
        } catch (error) {
            console.log(error);
        }
    }
}

