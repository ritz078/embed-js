import {escapeRegExp} from '../utils'

const defaultIcons = [{
	'text': ':)',
	'code': '&#xe60a'
}, {
	'text': ':D',
	'code': '&#xe608'
}, {
	'text': ':d',
	'code': '&#xe608'
}, {
	'text': ':(',
	'code': '&#xe60e'
}, {
	'text': ':/',
	'code': '&#xe620'

}, {
	'text': ':P',
	'code': '&#xe60c'
}, {
	'text': ':p',
	'code': '&#xe60c'
}, {
	'text': '3:)',
	'code': '&#xe618'
}, {
	'text': '(^)',
	'code': '&#xe607'
}, {
	'text': ';)',
	'code': '&#xe610'
}, {
	'text': ':o',
	'code': '&#xe61a'
}, {
	'text': ':O',
	'code': '&#xe61a'
}, {
	'text': '-_-',
	'code': '&#xe61e'
}, {
	'text': '(y)',
	'code': '&#xe606'
}, {
	'text': ':*',
	'code': '&#xe604'
}, {
	'text': '&lt;3',
	'code': '&#xe604'
}, {
	'text': '<3',
	'code': '&#xe604'
}, {
	'text': '&lt;/3',
	'code': '&#xe605'
}, {
	'text': '</3',
	'code': '&#xe605'
}, {
	'text': '^_^',
	'code': '&#xe612'
}, {
	'text': '8-)',
	'code': '&#xe614'
}, {
	'text': '8|',
	'code': '&#xe614'
}, {
	'text': ':S',
	'code': '&#xe61c'
}, {
	'text': ':s',
	'code': '&#xe61c'
}];

export default function (input, options) {
	const icons = options.customFontIcons.length ? options.customFontIcons : defaultIcons;

	const escapedSymbols = icons.map((val) => escapeRegExp(val.text));

	const smileyRegex = new RegExp(`(^|\\s)(${escapedSymbols.join('|')})(?=\\s|$)`, 'gi');

	return input.replace(smileyRegex, (match, pre, text) => {
		let index = escapedSymbols.indexOf(escapeRegExp(text));
		if (index === -1) return match;
		let code  = icons[index].code;
		return options.template.smiley(text, pre, code, options);
	});
}

