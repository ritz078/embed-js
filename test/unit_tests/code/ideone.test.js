import Ideone from '../../../src/js/modules/code/ideone.es6';
import {options, ejs} from '../../options';
import { cloneObject } from '../../../src/js/modules/utils.es6'
import Url from '../../../src/js/modules/url.es6'
let expect = chai.expect;

function init(input, output, opts = options, embeds = []) {
	output = opts.link === true ? new Url(input, options).process() : output;
	return new Ideone(input, output, opts, embeds).process()
}

describe('Class Ideone => unit test', function () {
	describe('test with single matching', function () {

		describe('normal embedding', function () {

			let output, embeds;
			let input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;

			[output, embeds] = init(input, output);

			it('should return a valid embedding url', function () {

				expect(output).to.be.a('string');
				expect(embeds).to.be.a('array');
				expect(embeds[0].text.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(`<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/HH8rmZ" frameborder="0" height="500"></iframe></div>`)
			});
		});


		describe('inline embedding', function () {
			it('should return correct result for inline embedding with url embed enabled', function () {
				let output, embeds;

				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';

				let input = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self">http://ideone.com/HH8rmZ</a><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?')
			});


			it('should return correct result for inline embedding with url embed disabled', function () {
				let input, output, embeds;
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = false;

				input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium http://ideone.com/HH8rmZ<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?')
			});

			it('should return correct result for inline embedding with inlineText and link disabled', function () {
				let input, output, embeds;

				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = false;
				opts.inlineText  = false;

				input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?')
			});

			it('should return correct result for inline embedding with inlineText disabled and link enabled', function () {
				let input, output, embeds;
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = true;
				opts.inlineText  = false;

				input = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self"><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div></a> grandis, pius zetaes.Cur luna persuadere?`
				)
			})
		});
	});


	describe('test with multiple matching', function () {

		describe('normal embedding', function () {

			let input, output, embeds;
			input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?`;

			[output, embeds] = init(input, output);

			it('should return correct results for multiple embeds', function () {
				expect(embeds).to.have.length(2);
				expect(output).to.not.be.undefined;
			});
		});


		describe('inline embedding', function () {
			it('should return correct result with link enabled and inlineText disabled', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?`;
				let opts        = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.inlineText = false;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self"><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div></a> grandis, pius zetaes <a href="http://ideone.com/ETAZsa" rel="" target="self"><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div></a> .Cur luna persuadere?`
				)
			});

			it('should return correct result with link disabled and inlineText disabled', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?`;

				let opts        = cloneObject(options);

				opts.link = false;
				opts.inlineEmbed = 'all';
				opts.inlineText = false;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes <div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> .Cur luna persuadere?`
				)
			});

			it('should return correct result with link disabled and inlineText enabled', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?`;

				let opts        = cloneObject(options);

				opts.link = false;
				opts.inlineEmbed = 'all';

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium http://ideone.com/HH8rmZ<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes http://ideone.com/ETAZsa<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> .Cur luna persuadere?`
				)
			});

			it('should return correct result with link enabled and inlineText enabled', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?`;

				let opts        = cloneObject(options);

				opts.inlineEmbed = 'all';

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self">http://ideone.com/HH8rmZ</a><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes <a href="http://ideone.com/ETAZsa" rel="" target="self">http://ideone.com/ETAZsa</a><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> .Cur luna persuadere?`
				)
			})
		})
	});
});
