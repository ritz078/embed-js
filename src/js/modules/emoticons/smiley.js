import {escapeRegExp} from '../utils'

export default class Smiley {
	constructor(input, options) {
		this.input   = input;
		this.options = options;

		let defaultIcons = [{
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

		this.icons = options.customFontIcons.length ? options.customFontIcons : defaultIcons;

		this.escapedSymbols = this.icons.map((val) => escapeRegExp(val.text));

		this.smileyRegex = new RegExp(`(^|\\s)(${this.escapedSymbols.join('|')})(?=\\s|$)`, 'gi');
	}

	process() {
		return this.input.replace(this.smileyRegex, (match, pre, text) => {
			let index = this.escapedSymbols.indexOf(escapeRegExp(text));
			let code  = this.icons[index].code;
			return this.options.template.smiley(text, pre, code, this.options);
		});
	}
}

