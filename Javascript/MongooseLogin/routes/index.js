var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    //userController.createTestUser();
    res.render('index', { title: 'MongooseLogin', error: false});
});

/* login endpoint */
router.post('/', function(req, res, next) {
    userController.verifyUser(req.body.email, req.body.password)
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
