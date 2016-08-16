var path = require('path');
var session = require('express-session');
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MAIN ROUTES FOR THE APP
app.use('/', require('./routes'));

// SESSION stuff

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    if (req.session.authorized) {
        var views = req.session.views;
        if (!views) {
            views = req.session.views = {}
        }

        // get the url pathname
        var pathname = req.originalUrl;

        // count the views
        views[pathname] = (views[pathname] || 0) + 1;
    }
    next();
});

app.get('/authorize', function (req, res, next) {
    req.session.authorized = true;
    res.send('you should now be authorized');
});

app.get('/revoke', function (req, res, next) {
    delete req.session.authorized;
    res.send('you have revoked your authorization');
});

app.get('/foo', function (req, res, next) {
    if (req.session.authorized) {
        res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
    } else {
        res.status(401).send('unauthorized');
    }
});

app.get('/bar', function (req, res, next) {
    console.log('session id#%s', req.sessionID);
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
});


// ROUTES TO SERVE STATIC ITEMS (images, scripts, etc)
app.use(express.static('./public/'));

app.listen(3000, function () {
    console.log('expressjs app listening on port 3000!');
});


