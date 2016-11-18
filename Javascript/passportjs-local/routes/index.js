var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome Users' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Welcome Users' });
});

router.get('/signup', function (req, res) {
    res.render('signup', {title: 'New User'});
});

router.get('/profile', function (req, res) {
    // TODO: update this route to a better profile page
    res.render('index', {title: 'Success', successMsg: 'Welcome to your profile!'});
});

module.exports = function(passport) {
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
