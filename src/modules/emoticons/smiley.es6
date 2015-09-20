import utils from '../utils.es6';

class Smiley {
	constructor(input) {
		this.input = input;

		this.icons = [
			{
				'text': ':)',
				'code': 'e60a'
			},
			{
				'text': ':D',
				'code': 'e608'
			},
			{
				'text': ':d',
				'code': 'e608'
			},
			{
				'text': ':(',
				'code': 'e60e'
			},
			{
				'text': ':/',
				'code': 'e620'

			},
			{
				'text': ':P',
				'code': 'e60c'
			},
			{
				'text': ':p',
				'code': 'e60c'
			},
			{
				'text': '3:)',
				'code': 'e618'
			},
			{
				'text': '(^)',
				'code': 'e607'
			},
			{
				'text': ';)',
				'code': 'e610'
			},
			{
				'text': ':o',
				'code': 'e61a'
			},
			{
				'text': '-_-',
				'code': 'e61e'
			},
			{
				'text': '(y)',
				'code': 'e606'
			},
			{
				'text': ':*',
				'code': 'e604'
			},
			{
				'text': '&lt;3',
				'code': 'e604'
			},
			{
				'text': '<3',
				'code': 'e604'
			},
			{
				'text': '&lt;/3',
				'code': 'e605'
			},
			{
				'text': '</3',
				'code': 'e605'
			},
			{
				'text': '^_^',
				'code': 'e612'
			},
			{
				'text': '8-)',
				'code': 'e614'
			},
			{
				'text': '8|',
				'code': 'e614'
			},
			{
				'text': ':S',
				'code': 'e61c'
			},
			{
				'text': ':s',
				'code': 'e61c'
			}
		];

		this.EscapedSymbols = this.icons.map(function (val) {
			return utils.escapeRegExp(val.text);
		});

		this.smileyRegex = new RegExp(`(${this.EscapedSymbols.join('|')})`,'g');
	}

	process() {
		return this.input.replace(this.smileyRegex,(match, text)=>{
			let index = this.EscapedSymbols.indexOf(utils.escapeRegExp(text));
			let code = this.icons[index].code;
			return `<span class="icon-emoticon" title="${text}">&#x${code}</span>`;
		})
	}

}

module.exports = Smiley;
