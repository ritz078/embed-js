import Ideone from '../../../src/js/modules/code/ideone.es6';
import {options, ejs} from '../../options';
import { cloneObject } from '../../../src/js/modules/utils.es6'
import Url from '../../../src/js/modules/url.es6'
let expect = chai.expect;

describe('Class Ideone => unit test', function () {
	describe('test with single matching', function () {

		describe('normal embedding', function () {

			let output;
			let embeds = [];
			let input  = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;
			let ideone       = new Ideone(input, output, options, embeds);
			[output, embeds] = ideone.process();


			it('should return a valid embedding url', function () {

				expect(output).to.be.a('string');
				expect(embeds).to.be.a('array');

				expect(embeds[0].text.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(`<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/HH8rmZ" frameborder="0" height="500"></iframe></div>`)
			});
		});


		describe('inline embedding', function () {
			it('should return correct result for inline embedding with url embed enabled', function () {
				let output;
				let embeds       = [];
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';

				let input  = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;
				output     = new Url(input, opts).process();
				let ideone = new Ideone(input, output, opts, embeds);

				[output, embeds] = ideone.process();

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self">http://ideone.com/HH8rmZ</a><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?')
			});


			it('should return correct result for inline embedding with url embed disabled', function () {
				let output;
				let embeds       = [];
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = false;

				let input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;
				let ideone = new Ideone(input, output, opts, embeds);

				[output, embeds] = ideone.process();

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium http://ideone.com/HH8rmZ<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?')
			});

			it('should return correct result for inline embedding with inlineText and link disabled', function () {
				let output;
				let embeds       = [];
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = false;
				opts.inlineText  = false;

				let input = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;
				let ideone = new Ideone(input, output, opts, embeds);

				[output, embeds] = ideone.process();

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal('Sunt castores desiderium <div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?')
			});

			it('should return correct result for inline embedding with inlineText disabled and link enabled', function () {
				let output;
				let embeds       = [];
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = true;
				opts.inlineText  = false;

				let input = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes.Cur luna persuadere?`;

				output = new Url(input, opts).process();

				let ideone = new Ideone(input, output, opts, embeds);

				[output, embeds] = ideone.process();

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://ideone.com/HH8rmZ" rel="" target="self"><div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/" frameborder="0" height="500"></iframe></div></a> grandis, pius zetaes.Cur luna persuadere?`
				)
			})
		});
	});


	describe('test with multiple matching', function () {

		it('should return correct results for multiple embeds', function () {

			let output;
			let embeds = [];
			let input  = output = `Sunt castores desiderium http://ideone.com/HH8rmZ grandis, pius zetaes http://ideone.com/ETAZsa .Cur luna persuadere?`;
			let ideone       = new Ideone(input, output, options, embeds);
			[output, embeds] = ideone.process();

			expect(embeds).to.have.length(2);
			expect(output).to.not.be.undefined;
		});
	});
});
