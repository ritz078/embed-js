function makeServer(name, done) {
	var express = require('express');
	var path = require('path');
	var app = express();

	app.use(express.static('dist'))

	app.get('/', function (req, res) {
		res.status(200).sendFile(`test/html/${name}.html`, {root: path.resolve()});
	});
	var server = app.listen(3000, function () {
		var port = server.address().port;
		done()
	});
	return server;
}
module.exports = makeServer;

