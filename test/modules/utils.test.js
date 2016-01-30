import { toUrl, truncate, getUnique, deepExtend, escapeRegExp, createText, matches, ifEmbed, getDimensions, urlRegex } from '../../src/js/modules/utils.js'
var expect = chai.expect;

describe('utility methods unit tests', function(){
	describe('toUrl() method', function() {
		"use strict";
		it('should convert string into a valid url', function() {
			expect(toUrl('github.com')).to.equal('//github.com');
			expect(toUrl('//github.com')).to.equal('//github.com');
		});

		it('should return a string', function() {
			expect(toUrl('github.com')).to.be.a('string');
		});
	});


	describe('truncate() method', function() {
		"use strict";
		it('should return a string', function() {
			expect(truncate('Est fidelis fuga', 10)).to.be.a('string');
		});

		it('should trucate the string if its longer than n', function() {
			expect(truncate('Est fidelis fuga', 10)).to.equal('Est fidel...');
		});

		it('should not truncate the string if its size is smaller than n', function() {
			expect(truncate('Est', 10)).to.equal('Est');
		})
	});

	describe('getUnique() method', function() {
		"use strict";
		var arr = [1, 3, 'a', 'a', 1, 5];
		it('should return an array', function() {
			expect(getUnique(arr)).to.be.a('Array');
		});

		it('should return an array of unique values', function() {
			expect(getUnique([1, 3, 'a', 'a', 1, 5])).to.eql([1, 3, 'a', 5]);
		})
	});


	describe('deepExtend() method', function() {
		"use strict";
		var defaults = {
			a: 1,
			b: 'hello',
			c: {
				d: 2,
				e: true
			}
		};

		var opts = {
			a: 3,
			c: {
				e: false
			}
		};

		var expected = {
			a: 3,
			b: 'hello',
			c: {
				d: 2,
				e: false
			}
		};

		it('should correctly extend the object', function() {
			expect(deepExtend(defaults, opts)).to.eql(expected)
		});

		it('should return an object', function() {
			expect(deepExtend(opts, defaults)).to.be.a('object');
		});

	});

	describe('escapeRegExp() method', function() {
		"use strict";
		var x = ':):/';
		it('should return a valid regex pattern', function() {
			var reg = new RegExp(escapeRegExp(x), 'g');
			expect(x).to.match(reg);
		});
	});

	describe('createText() method', function() {
		"use-strict";
		let str = 'This is embed.js';
		let embeds = [{
			index: 3,
			text: 'foo'
		}, {
			index: 1,
			text: 'bar'
		}, {
			index: 2,
			text: 'john'
		}];

		it('should return a string', function() {
			expect(createText(str, embeds)).to.be.a("string");
		});

		it('should return a string after concatenating the embeds in correct order', function() {
			expect(createText(str, embeds)).to.equal('This is embed.js bar john foo');
		});
	});

	describe('matches() method', function() {
		let regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
		let input = 'The documentation is available at http://someurl.jpg';
		let match = matches(regex, input);
		it('should return an object', function() {
			expect(match).to.be.a("array");
		});

		it('should return the location index of the matching substring', function() {
			expect(match.index).to.exist;
		});
	});

	describe('ifEmbed() method', function() {
		let options = {
			excludeEmbed: ["something"]
		};
		let service1 = "something";
		let service2 = "everything";

		it('should return true if the service is excluded', function() {
			expect(ifEmbed(options, 'everything')).to.be.true;
		});

		it('should return false if the service is not excluded', function() {
			expect(ifEmbed(options, 'something')).to.be.false;
		});
	});

	describe('getDimensions() method', function() {

		it('should return the height 450 if height is 600 and vice versa', function() {
			let options = {
				videoWidth: 600,
				videoHeight: null
			};

			let result = {
				height: 450,
				width: 600
			};

			expect(getDimensions(options)).to.eql(result);

			let options2 = {
				videoHeight: 450,
				videoWidth: null
			};

			expect(getDimensions(options2)).to.eql(result);

		});
	});

	describe('urlRegex() method', function(){
		it('should return a regex', function(){
			expect(urlRegex()).to.be.an.instanceof(RegExp);
		});

		it('should match url like http://rkritesh.com/embed.js', function(){
			expect('http://rkritesh.com/embed.js').to.match(urlRegex())
		});

		it('should match url like ftp://something.com', function(){
			expect('ftp://something.com').to.match(urlRegex())
		});
	})

});
