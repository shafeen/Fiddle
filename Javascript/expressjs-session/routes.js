var express  = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var messagePrefix = req.cookies.name ? 'Hello ' + req.cookies.name + '! ': '';
    res.send(messagePrefix + 'Your expressjs-quickstart app is working!!');
});

router.get('/getindex/', function (req, res) {
    //res.sendFile('index.html', {root: './'}); // <-- this is one option
    res.render('index', {
        pageTitle: req.originalUrl,
        contentText: 'this is just some body content.'
    });
});

router.get('/gettest/', function (req, res) {
    res.send('this is a test GET route');
});

router.post('/posttest/', function (req, res) {
    res.status(200).json({
        message: 'posttest request successful!'
    });
});

module.exports = router;
