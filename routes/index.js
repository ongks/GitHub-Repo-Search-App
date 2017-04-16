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
		var resultsArray = [];
		body = JSON.parse(body);
		// compare search results with the input from user
		if (!body.repositories[0]) {
			searchRes = "No results found. Try again.";
			res.send(searchRes);
		} else {
			searchRes = body.repositories;
			for(var i = 0; i < searchRes.length; i++) {
				resultsArray.push(
					{owner: searchRes[i]["owner"],
					name: searchRes[i]["name"],
					language: searchRes[i]["language"],
					followers: searchRes[i]["followers"],
					url: searchRes[i]["url"],
					description: searchRes[i]["description"]}
				);
			}
			res.send(searchRes);
		}
		//console.log(body.repositories[0]);
		// pass back the results to client side
	};

	// request module is used to process the github api url and return the results in JSON format
	request(options, callback);
});

module.exports = router;
