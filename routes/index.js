var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GitHub Search' });
});

router.get('/search', function(req, res) {
	var val = req.query.search;
	var url = 'https://api.github.com/legacy/repos/search/' + val;
	console.log(url);

	//headers required to access github api
	var options = {
		url: url,
		headers: {
			'User-Agent': 'ongks'
		}
	};

	function callback(err, resp, body) {
		body = JSON.parse(body);
		// logic used to compare search results with the input from user
		if (!body['repositories']) {
			searchRes = "No results found. Try again.";
		} else {
			searchRes = body['repositories'];
		}
		// pass back the results to client side
		res.send(searchRes);
	}

	// request module is used to process the github api url and return the results in JSON format
	request(options, callback);
});

module.exports = router;
