import utils from '../utils.es6'
import helper from './helper.es6'
import '../../vendor/fetch.js'

export class Youtube {
    constructor(input, output, options, embeds) {
        this.input   = input;
        this.output  = output;
        this.options = options;
        this.embeds  = embeds;
        this.regex   = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
        this.service = 'youtube'
    }

    static formatData(data, utils) {
        return {
            title          : data.snippet.title,
            thumbnail      : data.snippet.thumbnails.medium.url,
            rawDescription : data.snippet.description,
            views          : data.statistics.viewCount,
            likes          : data.statistics.likeCount,
            description    : utils.truncate(data.snippet.description, 150),
            url            : `https://www.youtube.com/watch?v=${data.id}`,
            id             : data.id,
            host           : 'youtube'
        }
    }

    async data(id) {
        try {
            let url      = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${this.options.googleAuthKey}&part=snippet,statistics`;
            let response = await fetch(url);
            let data     = await response.json();
            return data.items[0];
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
                    let id = match[2];
                    let embedUrl = `https://www.youtube.com/embed/${id}`;
                    let data, text;
                    if (this.options.videoDetails) {
                        data = await this.data(id);
                        text = helper.getDetailsTemplate(Youtube.formatData(data, utils),data, embedUrl)
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
                    let id = match[1];
                    let embedUrl = `https://www.youtube.com/embed/${id}`;
                    let data, text;
                    if (this.options.videoDetails) {
                        data = await this.data(id);
                        text = helper.getDetailsTemplate(Youtube.formatData(data, utils),data, embedUrl);
                    } else {
                        text = helper.template(embedUrl, this.options);
                    }

                    this.embeds.push({
                        text: text,
                        index: match.index
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }

        return [this.output, this.embeds];
    }
}

