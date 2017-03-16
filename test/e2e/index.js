var conf = require('../../nightwatch.conf');

var server;
module.exports = {
	before: function (browser, done) {
		server = require('../server')(done)
	},

	after: function (browser) {
		browser.end()
		server.close()
	},

	'Smiley': function (browser) {
		browser
			.url('localhost:3000/test/smiley')   // visit the url
			.waitForElementVisible('.embed-js-applied'); // wait for the body to be rendered

		browser
			.assert.containsText('.embed-js-applied',
			'Lotus eleates vix attrahendams  luna est.Advenas mori!Fermiums prarere in cubiculum!Cum cacula cantare, omnes stellaes manifestum azureus, nobilis https://angularjs.org acipenseres.Cum orgia mori, omnes rationees '
		) // assert contains
			.saveScreenshot(conf.imgpath(browser) + 'embed.png')
	},

	'Facebook': function (browser) {
		browser
			.url('localhost:3000/test/facebook')   // visit the url
			.waitForElementVisible('.embed-js-applied'); // wait for the body to be rendered

		browser
			.pause(2000)
			.frame(0)
			.assert.elementPresent('#facebook') // assert contains
			.saveScreenshot(conf.imgpath(browser) + 'embed.png')
	}
};
