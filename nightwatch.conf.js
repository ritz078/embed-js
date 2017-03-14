require('env2')('./.env'); // optionally store your environment variables in .env
const PKG = require('./package.json'); // so we can get the version of the project
const BINPATH = './node_modules/nightwatch/bin/'; // change if required.
const SCREENSHOT_PATH = "./screenshots/" + PKG.version + "/";

const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions
	"src_folders": [
		"test/e2e"     // we use '/test' as the name of our test directory by default. So 'test/e2e' for 'e2e'.
	],
	"output_folder": "./node_modules/nightwatch/reports", // reports (test outcome) output by Nightwatch
	"selenium": {
		"start_process": true,
		"server_path": BINPATH + "selenium.jar", // downloaded by selenium-download module (see below)
		"log_path": "",
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.chrome.driver": BINPATH + "chromedriver" // also downloaded by selenium-download
		}
	},
	"test_workers": { "enabled": true, "workers": "auto" }, // perform tests in parallel where possible
	"test_settings": {
		"default": {
			"launch_url": "http://ondemand.saucelabs.com:80", // we're testing a local site
			"selenium_port": 80,
			"selenium_host": "ondemand.saucelabs.com",
			"silent": true,
			"screenshots": {
				"enabled": true, // save screenshots to this directory (excluded by .gitignore)
				"path": SCREENSHOT_PATH
			},
			"username": process.env.SAUCE_USERNAME,     // if you want to use Saucelabs remember to
			"access_key": process.env.SAUCE_ACCESS_KEY, // export your environment variables (see readme)
			"globals": {
				"waitForConditionTimeout": 10000    // wait for content on the page before continuing
			},
			"desiredCapabilities": {
				"tunnel-identifier": process.env.TRAVIS_JOB_NUMBER, // needed for sauce-connect, i.e for testing localhost on saucelabs
				build: `build-${process.env.TRAVIS_JOB_NUMBER}` // needed for sauce-connect
			}
		},
		"local": {
			"launch_url": "http://localhost",
			"selenium_port": 4444,
			"selenium_host": "127.0.0.1",
			"silent": true,
			"screenshots": {
				"enabled": true, // save screenshots taken here
				"path": SCREENSHOT_PATH
			}, // this allows us to control the
			"globals": {
				"waitForConditionTimeout": 15000 // on localhost sometimes internet is slow so wait...
			},
			"desiredCapabilities": {
				"browserName": "chrome",
				"chromeOptions": {
					"args": [
						`Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
						"--window-size=640,1136" // iphone 5
					]
				},
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		},
		"chrome": { // your local Chrome browser (chromedriver)
			"desiredCapabilities": {
				"browserName": "chrome",
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		},
		"chromemac": { // browsers used on saucelabs:
			"desiredCapabilities": {
				"browserName": "chrome",
				"platform": "OS X 10.11",
				"version": "47"
			}
		},
		"ie11": {
			"desiredCapabilities": {
				"browserName": "internet explorer",
				"platform": "Windows 10",
				"version": "11.0"
			}
		},
		"firefox": {
			"desiredCapabilities": {
				"platform": "XP",
				"browserName": "firefox",
				"version": "33"
			}
		},
		"internet_explorer_10": {
			"desiredCapabilities": {
				"platform": "Windows 7",
				"browserName": "internet explorer",
				"version": "10"
			}
		},
		"android_s4_emulator": {
			"desiredCapabilities": {
				"browserName": "android",
				"deviceOrientation": "portrait",
				"deviceName": "Samsung Galaxy S4 Emulator",
				"version": "4.4"
			}
		},
		"iphone_6_simulator": {
			"desiredCapabilities": {
				"browserName": "iPhone",
				"deviceOrientation": "portrait",
				"deviceName": "iPhone 6",
				"platform": "OSX 10.10",
				"version": "8.4"
			}
		}
	}
}
module.exports = config;

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
	if (err || !stat || stat.size < 1) {
		require('selenium-download').ensure(BINPATH, function (error) {
			if (error) throw new Error(error); // no point continuing so exit!
			console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
		});
	}
});

function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
	return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
	var a = browser.options.desiredCapabilities;
	var meta = [a.platform];
	meta.push(a.browserName ? a.browserName : 'any');
	meta.push(a.version ? a.version : 'any');
	meta.push(a.name); // this is the test filename so always exists.
	var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
	return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
