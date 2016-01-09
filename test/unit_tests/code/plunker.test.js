import Plunker from '../../../src/js/modules/code/plunker.es6';
import {options, ejs} from '../../options';
let expect = chai.expect;

describe('Class Plunker => unit test', function(){
	it('should return a valid plunked embedding url', function(){

		let output;
		let embeds = [];
		let input = output = `Sunt castores desiderium https://plnkr.co/edit/nVCmukG5abpi1Y4ZHkrq?p=preview grandis, pius zetaes.Cur luna persuadere?`;
		let plunker = new Plunker(input, output, options, embeds);
		[output, embeds] = plunker.process();

		expect(output).to.be.a('string');
		expect(embeds).to.be.a('array');

		expect(embeds[0].index).to.equal(33);

		expect(embeds[0].text.replace(/\t|\n/gi,'')).to.equal('<div class="ejs-embed ejs-plunker"><iframe class="ne-plunker" src="http://embed.plnkr.co/nVCmukG5abpi1Y4ZHkrq" height="500"></iframe></div>')
	})
});
