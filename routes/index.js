var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GitHub Search' });
});

router.get('/search', function(req, res) {
	var val = req.query.search;
	var url = 'https://api.github.com/legacy/repos/search/' + val;
	console.log(url);

});

module.exports = router;
