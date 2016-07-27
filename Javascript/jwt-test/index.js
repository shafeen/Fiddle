var express = require('express');
var app = express();

// compress all requests being served
var compression = require('compression');
app.use(compression());

// using bodyparser for POST body parsing
// TODO: limit this middleware to only the requests that need it
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// jwt library to creating and verifying tokens
var jwt = require('jsonwebtoken');
var jwtSecret = 'shhhhh'; // this secret should be hidden in an ENV variable

// this is how to use middleware for certain routes only
app.use('/gettest/', function (req, res, next) {
    req.middlewaremsg = 'msg set by middleware!';
    next();
});

// MAIN ROUTES FOR THE APP
app.get('/', function (req, res) {
    res.send('Your expressjs-quickstart app is working!!');
});

app.get('/jwt/get/', function (req, res) {
    var jwt = require('jsonwebtoken');
    var token = jwt.sign({ foo: 'bar' }, jwtSecret);
    console.log(token);
    res.json({
        jwt: token
    });
});

app.get('/jwt/verify/', function (req, res) {
    var token = req.query.token;
    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            res.send("Invalid token");
        } else {
            res.json(decoded);
        }
    });
});

app.post('/posttest/', function (req, res) {
    res.status(200).json({
        message: 'posttest request successful!'
    });
});

// ROUTES TO SERVE STATIC ITEMS (images, scripts, etc)
app.use('/images/', express.static('./images/'));
app.use('/scripts/', express.static('./scripts/'));

app.listen(3000, function () {
    console.log('expressjs app listening on port 3000!');
});


