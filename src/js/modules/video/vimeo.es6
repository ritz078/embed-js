import utils from '../utils.es6'
import { getDetailsTemplate, template, inlineEmbed, normalEmbed } from './../helper.es6'
import '../../vendor/fetch.js'


export default class Vimeo {
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
            title: data.title,
            thumbnail: data.thumbnail_medium,
            rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
            views: data.stats_number_of_plays,
            likes: data.stats_number_of_likes,
            description: utils.truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
            url: data.url,
            id: data.id,
            host: 'vimeo'
        }
    }

    async data(id) {
        try {
            let url = `https://vimeo.com/api/v2/video/${id}.json`;
            let response = await fetch(url);
            let data = await response.json();
            return data[0];
        } catch (error) {
            console.log(error);
        }

    }

    static async urlToText(_this, match, url, normalEmbed) {
        let id;
        if (!normalEmbed) {
            id = _this.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
        } else {
            id = match[3]
        }
        if (!id) return;
        let embedUrl = `https://player.vimeo.com/video/${id}`;
        let data;
        if (_this.options.videoDetails) {
            data = await _this.data(id);
            return getDetailsTemplate(Vimeo.formatData(data, utils), data, embedUrl)
        } else {
            return template(embedUrl, _this.options)
        }

    }

    async process() {
        try {
            if (!utils.ifInline(this.options, this.service)) {
                this.output = await inlineEmbed(this, Vimeo.urlToText);
            } else {
                this.embeds = await normalEmbed(this, Vimeo.urlToText);
            }

            return [this.output, this.embeds];
        } catch (error) {
            console.log(error);
        }
    }
}
