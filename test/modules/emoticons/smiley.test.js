var Smiley = require('../../../src/modules/emoticons/smiley.es6');
var expect = require('chai').expect;

var string = 'Hello :)';

var smiley = new Smiley(string);

describe('Smiley Unit Test', function(){
	"use strict";

	it('should return a string', function(){
		expect(smiley.process()).to.be.a('string');
	});

	it('should insert a font smiley', function(){
		expect(smiley.process()).to.equal(
			`Hello <span class="icon-emoticon" title=":)">&#xe60a</span>`
		)
	});
});
