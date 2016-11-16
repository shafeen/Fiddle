var User = require('../models/user.model');

exports.createUser = function (email, password) {
    var testUser = new User({
        email: email,
        password: password
    });
    testUser.save();
};

exports.createTestUser = function () {
    var testUser = new User({
        email: 'testUser@example.com',
        password: 'test1234'
    });
    testUser.save();
};

exports.verifyAndLoginUser = function (email, password, res) {
    User.find({ email: email, password: password }, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            if (results.length == 0) {
                res.render('index', { title: 'MongooseLogin', error: true});
            } else {
                res.render('index', { title: 'MongooseLogin', successMsg: 'Logged in successfully!'});
            }
        }
    });
};