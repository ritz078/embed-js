function makeServer(done) {
	var express = require('express');
	var path = require('path');
	var app = express();

	app.use('/test/static', express.static('dist'))

	app.get('/test/:html', function (req, res) {
		res.status(200).sendFile(`test/html/${req.params.html}.html`, {root: path.resolve()});
	});
	var server = app.listen(3000, function () {
		done()
	});
	return server;
}
module.exports = makeServer;

