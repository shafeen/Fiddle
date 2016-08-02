var express = require('express');
var app = express();

// compress all requests being served
var compression = require('compression');
app.use(compression());

// have cookies accessible from all incoming requests
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// add request logging with morgan
var logger = require('morgan');
app.use(logger('dev'));

// using bodyparser for POST body parsing
// TODO: limit this middleware to only the requests that need it
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// this is how to use middleware for certain routes only
app.use('/gettest/', function (req, res, next) {
    req.middlewaremsg = 'msg set by middleware!';
    next();
});

// MAIN ROUTES FOR THE APP
app.use('/', require('./routes'));

// ROUTES TO SERVE STATIC ITEMS (images, scripts, etc)
app.use(express.static('./public/'));

app.listen(3000, function () {
    console.log('expressjs app listening on port 3000!');
});


