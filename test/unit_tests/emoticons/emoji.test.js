import Emoji from '../../../src/js/modules/emoticons/emoji.js';
import {options, ejs} from '../../options'
let expect = chai.expect;

describe('Emoji Unit test', function () {
	var string  = 'I am happy :smile:';
	var string2 = 'I am happy :smile: :+1:';

	describe('should pass all tests', function () {
		it('should return a string', function () {
			let emoji = new Emoji(string, options);
			expect(emoji.process()).to.be.a('string');
		});

		it('should convert a emoji text into emoji', function () {
			let emoji = new Emoji(string, options);
			var emoji2 = new Emoji(string2, options);
			expect(emoji.process()).to.equal(`I am happy <span class="emoticon emoticon-smile" title=":smile:"></span>`);
			expect(emoji2.process()).to.equal(
				`I am happy <span class="emoticon emoticon-smile" title=":smile:"></span> <span class="emoticon emoticon-+1" title=":+1:"></span>`
			)
		})
	});
});
