var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'MongooseLogin', error: false});
});

router.get('/createTestUser', function (req, res) {
    userController.createTestUser();
    res.status(200).json({
        message: "Successfully created user!"
    });
});

/* login endpoint */
router.post('/', function(req, res, next) {
    userController.findUser(req.body.email, req.body.password)
    .then(function(results) {
        console.log(results);
        if (results.length == 0) {
            res.render('index', { title: 'MongooseLogin', error: true});
        } else {
            res.render('index', { title: 'MongooseLogin', successMsg: 'Logged in successfully!'});
        }
    }).then(null, function(err) {
        console.log(err);
    });
});

module.exports = router;
