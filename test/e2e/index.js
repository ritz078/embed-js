var conf = require('../../nightwatch.conf');
var getPort = require('get-port')

var server, port;
module.exports = {
	before: function (browser, done) {
		getPort().then(function(availablePort) {
			port = availablePort
			server = require('../server')(port, done)
		})
	},

	after: function () {
		server.close()
	},

	'Smiley': function (browser) {
		browser
			.url(`localhost:${port}/test/smiley`)   // visit the url
			.waitForElementVisible('.embed-js-applied'); // wait for the body to be rendered

		browser
			.assert.containsText('.embed-js-applied',
			'Lotus eleates vix attrahendams  luna est.Advenas mori!Fermiums prarere in cubiculum!Cum cacula cantare, omnes stellaes manifestum azureus, nobilis https://angularjs.org acipenseres.Cum orgia mori, omnes rationees '
		) // assert contains
			.saveScreenshot(conf.imgpath(browser) + 'embed.png')
			.end()
	},

	'Facebook': function (browser) {
		browser
			.url(`localhost:${port}/test/facebook`)   // visit the url
			.waitForElementVisible('.embed-js-applied'); // wait for the body to be rendered

                browser
                        .click('.ejs-facebook iframe')         // click on the iframe
                        .windowHandles(function(result) {
                          this.verify.equal(result.value.length, 2, 'There should be 2 windows open')
                          var newHandle = result.value[1]
                          this.switchWindow(newHandle)
                        })
                        .assert.urlContains('https://www.facebook.com/madovermarketing/')
                        .url(function(result){
                           var link = result.value
                           let id = link.split('/')
                           this.verify.equal(id.indexOf('/1402165223182741/') < 0, true)  // id of the post must be same
                        });

		browser
			.pause(2000)
                        .windowHandles(function(result) {
                          var newHandle = result.value[0]   // switch back
                          this.switchWindow(newHandle)
                        })
			.frame(0)
			.assert.elementPresent('#facebook') // assert contains
			.saveScreenshot(conf.imgpath(browser) + 'embed.png')
			.end()
	}
};
