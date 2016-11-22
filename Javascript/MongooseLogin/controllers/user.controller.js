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
        email: 'user@example.com',
        password: 'password'
    });
    testUser.save();
};

exports.findUser = function (email, password) {
    return User.find({ email: email, password: password }).exec();
};
