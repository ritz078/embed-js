import Base from '../base.es6'

export class BasicAudio extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi;
        this.service = 'audio'
    }

    template(match) {
        return ejs.template.basicAudio(match) || `<div class="ejs-audio ejs-embed"><audio src="${match}" controls class="video-js ejs-video-js"></audio></div>`
    }
}

