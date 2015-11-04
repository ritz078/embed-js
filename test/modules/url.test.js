const Url = require('../../src/js/modules/url.es6');
const expect = require('chai').expect;


const options = {
    linkOptions: {
        exclude: [],
        target: '_blank',
        rel:'nofollow'
    }
};
const string = new Url('The url is http://rkritesh.in', options);

describe('Replace url by anchor tags', function() {
    "use strict";
    it('should return a valid anchor tag by replacing the link', function() {
        expect(string.process()).to.equal(
            `The url is <a href="http://rkritesh.in" rel="nofollow" target="_blank">http://rkritesh.in</a>`
        )
    });
});
