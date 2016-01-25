import Codepen from '../../../src/js/modules/code/codepen.js';
import {options, ejs} from '../../options';
import { cloneObject } from '../../../src/js/modules/utils.js'
import Url from '../../../src/js/modules/url.js'
let expect = chai.expect;

function init(input, output, opts = options, embeds = []) {
	output = opts.link === true ? new Url(input, options).process() : output;
	return new Codepen(input, output, opts, embeds).process()
}

describe('Class Codepen => unit test', function () {
	describe('test with single matching', function () {

		describe('normal embedding', function () {

			let output, embeds;
			let input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes.Cur luna persuadere?`;

			[output, embeds] = init(input, output);

			it('should return a valid embedding url', function () {

				expect(output).to.be.a('string');
				expect(embeds).to.be.a('array');
				expect(embeds[0].text.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div>`
				)
			});
		});


		describe('inline embedding', function () {
			it('should return correct result with link => true && inlineText => true', function () {
				let input, output, embeds;

				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';

				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://codepen.io/ritz078/pen/ZQeaaG" rel="" target="self">http://codepen.io/ritz078/pen/ZQeaaG</a><div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?`
				)
			});


			it('should return correct result with link => false && inlineText => true', function () {
				let input, output, embeds;
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = false;

				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?`
				)
			});

			it('should return correct result with link => false && inlineText => false', function () {
				let input, output, embeds;

				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = false;
				opts.inlineText  = false;

				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div> grandis, pius zetaes.Cur luna persuadere?`
				)
			});

			it('should return correct result with link => true && inlineText => false', function () {
				let input, output, embeds;
				let opts         = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.link        = true;
				opts.inlineText  = false;

				input = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes.Cur luna persuadere?`;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://codepen.io/ritz078/pen/ZQeaaG" rel="" target="self"><div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div></a> grandis, pius zetaes.Cur luna persuadere?`
				)
			})
		});
	});


	describe('test with multiple matching', function () {

		describe('normal embedding', function () {

			let input, output, embeds;
			input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes http://codepen.io/ritz078/pen/JGRpPX .Cur luna persuadere?`;

			[output, embeds] = init(input, output);

			it('should return correct results for multiple embeds', function () {
				expect(embeds).to.have.length(2);
				expect(output).to.not.be.undefined;
			});
		});


		describe('inline embedding', function () {
			it('should return correct result with link => true && inlineText => false', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes http://codepen.io/ritz078/pen/JGRpPX .Cur luna persuadere?`;
				let opts        = cloneObject(options);
				opts.inlineEmbed = 'all';
				opts.inlineText = false;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://codepen.io/ritz078/pen/ZQeaaG" rel="" target="self"><div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div></a> grandis, pius zetaes <a href="http://codepen.io/ritz078/pen/JGRpPX" rel="" target="self"><div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/JGRpPX/?height=500"></iframe></div></a> .Cur luna persuadere?`
				)
			});

			it('should return correct result with link => false && inlineText => false', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes http://codepen.io/ritz078/pen/JGRpPX .Cur luna persuadere?`;

				let opts        = cloneObject(options);

				opts.link = false;
				opts.inlineEmbed = 'all';
				opts.inlineText = false;

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div> grandis, pius zetaes <div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/JGRpPX/?height=500"></iframe></div> .Cur luna persuadere?`
				)
			});

			it('should return correct result with link => false && inlineText => true', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes http://codepen.io/ritz078/pen/JGRpPX .Cur luna persuadere?`;

				let opts        = cloneObject(options);

				opts.link = false;
				opts.inlineEmbed = 'all';

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div> grandis, pius zetaes http://codepen.io/ritz078/pen/JGRpPX<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/JGRpPX/?height=500"></iframe></div> .Cur luna persuadere?`
				)
			});

			it('should return correct result with link => true && inlineText => true', function () {
				let input, output, embeds;
				input = output = `Sunt castores desiderium http://codepen.io/ritz078/pen/ZQeaaG grandis, pius zetaes http://codepen.io/ritz078/pen/JGRpPX .Cur luna persuadere?`;

				let opts        = cloneObject(options);

				opts.inlineEmbed = 'all';

				[output, embeds] = init(input, output, opts);

				expect(embeds).to.be.empty;
				expect(output).to.not.be.undefined;
				expect(output.replace(/(\r\n|\n|\r|\t)/gm, '')).to.equal(
					`Sunt castores desiderium <a href="http://codepen.io/ritz078/pen/ZQeaaG" rel="" target="self">http://codepen.io/ritz078/pen/ZQeaaG</a><div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/ZQeaaG/?height=500"></iframe></div> grandis, pius zetaes <a href="http://codepen.io/ritz078/pen/JGRpPX" rel="" target="self">http://codepen.io/ritz078/pen/JGRpPX</a><div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/ritz078/embed/JGRpPX/?height=500"></iframe></div> .Cur luna persuadere?`
				)
			})
		})
	});
});

