/**
 * This is a simple server to test the server integration of the openGraph support on embed.js
 */

var express = require('express')
var app = express()
var ogs = require('open-graph-scraper');
var router = express.Router();
var timeout = require('connect-timeout')

app.use(timeout(10000))
app.use(haltOnTimedout);



app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

router.get('/:url',function(req, res){
	var options = {
		url : req.params.url,
		timeout : 2000
	}

	ogs(options, function(err, results){
		if(err){
			res.json({
				success:false
			})
		}
		var response = results.data;
		console.log('YYYY:',response)
		if(response && response.ogTitle && response.ogDescription && response.ogUrl && response.ogImage){
			var data = {
			success:true,
			title : response.ogTitle,
			description : response.ogDescription,
			url : response.ogUrl,
			image : response.ogImage.url
		}
		res.json(data)
		}

	})
})

app.use('/', router)

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

var server = app.listen(3000, function(){
	var host = server.address().address
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})
