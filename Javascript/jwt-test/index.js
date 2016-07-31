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

// use this middleware for certain routes only
app.use('(/jwt/[a-zA-Z]+/)|(/protected/[a-zA-Z0-9]+/)', function (req, res, next) {
    req.jwtSecret = 'password'; // this secret should be hidden in an ENV variable
    next();
});

app.use('/gettest/', function (req, res, next) {
    req.middlewaremsg = 'msg set by middleware!';
    next();
});

// MAIN ROUTES FOR THE APP
app.get('/', function (req, res) {
    res.send('Your expressjs-quickstart app is working!!');
});

// 1. verify the user's password & send back a 30sec jwt token
// 2. user sends an api request with the token
// 3. verify the token and serve request
// 4. the served request should contain a refreshed token

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

app.get('/jwt/verify/', function (req, res) {
    var token = req.query.token;
    jwt.verify(token, req.jwtSecret, function(err, decoded) {
        if (err) {
            console.log(err.message);
            res.status(401).send(err.message);
        } else {
            var newToken = jwt.sign({foo: 'bar'}, req.jwtSecret, {expiresIn: 30});
            console.log(newToken);
            res.json({
                decodedToken: decoded,
                newToken: newToken
            });
        }
    });
});

app.get('/protected/api/', function (req, res) {
    var token = req.query.token;
    jwt.verify(token, req.jwtSecret, function (err, decoded) {
        if (err) {
            res.status(401).send(err.message);
        } else {
            // verify the token claims here
            if (decoded.foo == 'bar') {
                res.json({
                    refreshedToken: jwt.sign({foo: 'bar'}, req.jwtSecret, {expiresIn: 30}),
                    message: "Successfully served api endpoint!"
                });
            } else {
                res.status(401).send('Token has unexpected claims!');
            }
        }
    });
});

// ROUTES TO SERVE STATIC ITEMS (images, scripts, etc)
app.use('/images/', express.static('./images/'));
app.use('/scripts/', express.static('./scripts/'));

app.listen(3000, function () {
    console.log('expressjs app listening on port 3000!');
});


