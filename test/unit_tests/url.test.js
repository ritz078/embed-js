import Url from '../../src/js/modules/url.es6';
let expect = chai.expect;

describe('Class Url unit test', function () {
	describe('should return a valid url', function () {

		let options = {
			link       : true,
			linkOptions: {
				target : 'self',
				exclude: ['pdf'],
				rel    : ''
			}
		};


		it('should return a valid anchor tag for http://xyz.com/abc', function () {
			let input   = `http://xyz.com/abc`;
			let result     = new Url(input, options).process();
			expect(result).to.be.a('string');
			expect(result).to.equal('<a href="http://xyz.com/abc" rel="" target="self">http://xyz.com/abc</a>');
		});

		it('should exclude the urls with excluded extensions', function(){
			let input = `https://something.pdf http://a.jpg`;
			let result     = new Url(input, options).process();
			expect(result).to.be.a('string');
			expect(result).to.equal(`https://something.pdf <a href="http://a.jpg" rel="" target="self">http://a.jpg</a>`);
		});

		it('should support shortened urls like bit.ly/abc', function(){
			let input = `bit.ly/abc`;
			let url = new Url(input, options);
			let result = url.process();
			expect(result).to.be.a('string');
			expect(result).to.equal(`<a href="//bit.ly/abc" rel="" target="self">bit.ly/abc</a>`)
		})
	})
});
