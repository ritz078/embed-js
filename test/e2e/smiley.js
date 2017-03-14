var conf = require('../../nightwatch.conf');

var server;
module.exports = {
	before: function (browser, done) {
		server = require('../server')('smiley', done)
	},

	after: function () {
		server.close()
	},

	'Smiley': function (browser) {
		browser
			.url('localhost:3000')   // visit the url
			.waitForElementVisible('.embed-js-applied'); // wait for the body to be rendered

		browser
			.assert.containsText('.embed-js-applied',
			'Lotus eleates vix attrahendams  luna est.Advenas mori!Fermiums prarere in cubiculum!Cum cacula cantare, omnes stellaes manifestum azureus, nobilis https://angularjs.org acipenseres.Cum orgia mori, omnes rationees '
		) // assert contains
			.saveScreenshot(conf.imgpath(browser) + 'dwyl.png')
			.end()
	}
};
