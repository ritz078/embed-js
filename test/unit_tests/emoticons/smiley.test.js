import Smiley from '../../../src/js/modules/emoticons/smiley.es6';
import {options, ejs} from '../../options'
let expect = chai.expect;

describe('Smiley Unit Test', function(){
	"use strict";
	var string = 'Hello :)';

	it('should return a string', function(){
		let smiley = new Smiley(string, options);
		expect(smiley.process()).to.be.a('string');
	});

	it('should insert a font smiley', function(){
		let smiley = new Smiley(string, options);
		expect(smiley.process()).to.equal(
			`Hello <span class="icon-emoticon" title=" :) ">&#xe60a</span>`
		)
	});
});
