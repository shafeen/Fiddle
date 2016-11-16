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
    userController.verifyAndLoginUser(req.body.email, req.body.password, res);
});

module.exports = router;
