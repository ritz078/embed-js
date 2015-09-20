var utils = require('../../src/modules/utils.es6');
var mocha = require('mocha');
var expect = require('chai').expect;

describe('Utility functions',function(){
    "use strict";
	it('should convert string into a valid url', function () {
		expect(utils.toUrl('github.com')).to.be.a('string');
		expect(utils.toUrl('github.com')).to.equal('//github.com');
		expect(utils.toUrl('//github.com')).to.equal('//github.com');
		expect(utils.toUrl('//github.com')).to.equal('//github.com');
	});

	it('should truncate a string', function(){
		expect(utils.truncate('Est fidelis fuga', 10)).to.be.a('string');
		expect(utils.truncate('Est fidelis fuga', 10)).to.equal('Est fidel...');
		expect(utils.truncate('Est',10)).to.equal('Est');
	});

	it('should return an array having unique values',function(){
		expect(utils.getUnique([1,3,'a','a',1,5])).to.be.a('Array');
		expect(utils.getUnique([1,3,'a','a',1,5])).to.eql([1,3,'a',5]);
	});
});
