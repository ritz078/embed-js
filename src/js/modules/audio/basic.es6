import Base from '../base.es6'
import regex from '../regex.es6'

export default class BasicAudio extends Base {
    constructor(input, output, options, embeds) {
        super(input, output, options, embeds);
        this.regex = regex.basicAudio;
        this.service = 'audio'
    }

    template(match) {
        return this.options.template.basicAudio(match, this.options);
    }
}

