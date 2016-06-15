import regex from '../regex';
import {lastElement} from '../utils';

function getEmoji(match) {
	return match[0] === ':' && (lastElement(match) === ':') && match.substring(1, match.length - 1)
}

export default function (output, options) {
	return output.replace(regex.smileys, function (match) {
		const emoji = getEmoji(match);
		if (emoji) {
			return options.template.emoji(emoji, options)
		}
		return match;
	});
}
