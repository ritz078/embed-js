import Codepen from '../../../src/js/modules/code/codepen.es6';
import {options, ejs} from '../../options';
let expect = chai.expect;

describe('Class Codepen => unit test', function(){
	it('should return a valid plunked embedding url', function(){

		let output;
		let embeds = [];
		let input = output = `Sunt castores desiderium http://codepen.io/enxaneta/pen/meYEzO#0 grandis, pius zetaes.Cur luna persuadere?`;
		let codepen = new Codepen(input, output, options, embeds);
		[output, embeds] = codepen.process();

		expect(output).to.be.a('string');
		expect(embeds).to.be.a('array');

		expect(embeds[0].text.replace(/(\r\n|\n|\r|\t)/gm,'')).to.equal(`<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="500" src="http://codepen.io/enxaneta/embed/meYEzO/?height=500"></iframe></div>`)
	})
});

