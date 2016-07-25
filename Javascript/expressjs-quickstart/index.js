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

// this is how to use middleware for certain routes only
app.use('/gettest/', function (req, res, next) {
    req.middlewaremsg = 'msg set by middleware!';
    next();
});

// MAIN ROUTES FOR THE APP
app.get('/', function (req, res) {
    res.send('Your expressjs-quickstart app is working!!');
});

app.get('/gettest/', function (req, res) {
    res.sendFile('index.html', {root: './'});
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


