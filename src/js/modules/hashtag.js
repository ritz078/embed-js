import regex from './regex';

export default function (input, options) {
	const hRegex = regex.hashtag;
	return input.replace(hRegex,(match)=>{
		const username = match.split('#')[1];
		return options.hashtagUrl(username);
	})
}
