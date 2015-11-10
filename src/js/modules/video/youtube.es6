const utils = require('../utils.es6');
const helper = require('./helper.es6');

class Youtube {
    constructor(input,output, options, embeds) {
        [this.input,this.output,this.options,this.embeds] = [input,output,options,embeds];
        this.regex   = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
    }

    formatData(data) {
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
            let match;
            while ((match = utils.matches(this.regex, this.input)) !== null) {
                let embedUrl = `https://www.youtube.com/embed/${match[1]}`;
                let data, text;
                if(this.options.videoDetails){
                   data = await this.data(match[1]);
                   text = helper.detailsTemplate(this.formatData(data), embedUrl);
                } else {
                    text = helper.template(embedUrl, this.options);
                }

                this.embeds.push({
                    text: text,
                    index: match.index
                })
            }

            return [this.output, this.embeds];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Youtube;
