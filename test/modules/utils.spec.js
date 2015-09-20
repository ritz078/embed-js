var utils = require('../../src/modules/utils.es6');
var mocha = require('mocha');
var expect = require('chai').expect;

describe('toUrl() method',function(){
    "use strict";
	it('should convert string into a valid url', function () {
		expect(utils.toUrl('github.com')).to.equal('//github.com');
		expect(utils.toUrl('//github.com')).to.equal('//github.com');
	});

	it('should return a string',function(){
		expect(utils.toUrl('github.com')).to.be.a('string');
	});
});


describe('truncate() method',function(){
	"use strict";
	it('should return a string', function () {
		expect(utils.truncate('Est fidelis fuga', 10)).to.be.a('string');
	});

	it ('should trucate the string if its longer than n', function(){
		expect(utils.truncate('Est fidelis fuga', 10)).to.equal('Est fidel...');
	});

	it('should not truncate the string if its size is smaller than n', function(){
		expect(utils.truncate('Est',10)).to.equal('Est');
	})
});

describe('getUnique() method', function(){
	"use strict";
	var arr = [1,3,'a','a',1,5];
	it('should return an array', function(){
		expect(utils.getUnique(arr)).to.be.a('Array');
	});

	it('should return an array of unique values', function(){
		expect(utils.getUnique([1,3,'a','a',1,5])).to.eql([1,3,'a',5]);
	})
});
