var express = require('express');
var router = express.Router();
var moment = require('moment');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', timenow: moment().format('MMMM Do YYYY, h:mm:ss a') });
});

module.exports = router;
