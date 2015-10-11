import utils from '../utils.es6';

class Youtube {
    constructor(input, options, embeds) {
        this.input = input;
        this.options = options;
        this.embeds = embeds;

        this.regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
    }

    formatData(data) {
        return {
            title: data.snippet.title,
            thumbnail: data.snippet.thumbnails.medium.url,
            rawDescription: data.snippet.description,
            views: data.statistics.viewCount,
            likes: data.statistics.likeCount,
            description: utils.truncate(data.snippet.description, 150),
            url: `https://www.youtube.com/watch?v=${data.id}`,
            id: data.id,
            host: 'youtube'
        }
    }

    template(data) {
        var template =
            `<div class="ejs-video">
		<div class="ejs-video-preview">
		<div class="ejs-video-thumb">
		<img src="${data.thumbnail}" alt="${data.host}/${data.id}"/>
		<i class="fa fa-play-circle-o"></i>
		</div>
		<div class="ejs-video-detail">
		<div class="ejs-video-title">
		<a href="${data.url}">${data.title}</a>
		</div>
		<div class="ejs-video-desc">${data.description}</div>
		<div class="ejs-video-stats">
		<span><i class="fa fa-eye"></i>${data.views}</span>
		<span><i class="fa fa-heart"></i>${data.likes}</span>
		</div>
		</div>
		</div>
		</div>`;
        return template;
    }

    async data(id) {
        try {
            let url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${this.options.googleAuthKey}&part=snippet,statistics`;
            let response = await fetch(url);
            let data = await response.json();
            return data.items[0];
        } catch (error) {
            console.log(error);
        }
    }

    async process() {
        try {
            let match;
            while ((match = utils.matches(this.regex, this.input)) !== null) {
                let data = await this.data(match[1]);
                let text = this.template(this.formatData(data));
                this.embeds.push({
                    text: text,
                    index: match.index
                })
            }
            return this.embeds;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Youtube;
