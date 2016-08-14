var express = require('express');
var subapp = express.Router();


/* GET home page. */
subapp.get('/', function(req, res, next) {
  res.render('index', { title: 'Express (sub app)' });
});

subapp.get('/chat/', function (req, res, next) {
  res.render('chat', {
    title: 'Socket.IO chat'
  });
});

module.exports = subapp;
