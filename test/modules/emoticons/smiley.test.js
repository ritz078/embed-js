import {Smiley} from '../../../src/js/modules/emoticons/smiley.es6'
var expect = require('chai').expect;

let options = {
	customFontIcons:[]
}

var string = 'Hello :)';

var smiley = new Smiley(string, options);

var urlstring = 'https://github.com';

var urlString = new Smiley(urlstring, options);


describe('Smiley Unit Test', function(){
	"use strict";

	it('should return a string', function(){
		expect(smiley.process()).to.be.a('string');
	});

	it('should insert a font smiley', function(){
		expect(smiley.process()).to.equal(
			`Hello <span class="icon-emoticon" title=" :) ">&#xe60a</span>`
		)
	});

	it('should not convert the characters in a url', function(){
		expect(urlString.process()).to.equal(urlstring);
	})
});
