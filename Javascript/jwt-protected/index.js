var express = require('express');
var logger = require('morgan');
var app = express();

// compress all requests being served
var compression = require('compression');
app.use(compression());

// use logger when serving requests
app.use(logger('dev'));

// using bodyparser for POST body parsing
// TODO: limit this middleware to only the requests that need it (POSTS)
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// jwt library to creating and verifying tokens
var jwt = require('jsonwebtoken');

var utility = require('./utility');

// MAIN ROUTES FOR THE APP
app.get('/', function (req, res) {
    res.send('Your jwt test app is working!!');
});

// 1. verify the user's password & send back a 30sec jwt token
// 2. user sends an api request with the token
// 3. verify the token and serve request
// 4. the served request should contain a refreshed token

app.use('/jwt/[a-zA-Z]+/', utility.attachSecret);

app.get('/jwt/get/', function (req, res) {
    // create a token that expires in 30 seconds
    var token = jwt.sign({
        foo: 'bar'
    }, req.jwtSecret, {
        expiresIn: 30
    });
    console.log(token);
    res.json({
        jwt: token
    });
});

app.use('/protected/[a-zA-Z]+/',  utility.attachSecret, utility.verifyToken);

app.get('/protected/api/', function (req, res) {
    res.json({
        refreshedToken: jwt.sign({foo: 'bar'}, req.jwtSecret, {expiresIn: 30}),
        message: "Successfully served api endpoint!"
    });
});

app.listen(3000, function () {
    console.log('expressjs app listening on port 3000!');
});


