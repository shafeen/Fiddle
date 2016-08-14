var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express (sub app)' });
});

router.get('/chat/', function (req, res, next) {
  res.render('chat', {
    title: 'Socket.IO chat'
  });
});

module.exports = router;
