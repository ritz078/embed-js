import Base from '../base'
import regex from '../regex'

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

