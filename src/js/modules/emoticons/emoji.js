import regex from '../regex';

export default class Emoji {
	constructor(output, options) {
		this.output  = output;
		this.options = options;

		this.emojiRegex = regex.smileys;
	}

	static getEmoji(match) {
		return match[0] === ':' && match[match.length - 1] === ':' && match.substring(1, match.length-1)
	}

	process() {
		return this.output.replace(this.emojiRegex, (match) => {
			const emoji = Emoji.getEmoji(match);
			if (emoji){
				return this.options.template.emoji(emoji, this.options)
			}
			return match;
		});
	}
}

