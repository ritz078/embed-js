import regex from './regex';

export default function (input, options) {
	const mRegex = regex.mentions;
	return input.replace(mRegex,(match) => {
		const username = match.split('@')[1];
		return options.mentionsUrl(username);
	})
}
