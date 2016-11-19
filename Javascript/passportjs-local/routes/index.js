var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome Users' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Welcome Users', loginMsg: req.flash('loginMessage') });
});

router.get('/signup', function (req, res) {
    res.render('signup', {title: 'New User', signupMsg: req.flash('signupMessage')});
});

//we want this protected so you have to be logged in to visit
router.get('/profile', isLoggedIn, function (req, res) {
    // TODO: update this route to a better profile page
    res.render('index', {title: 'Success', successMsg: 'Welcome to your profile!'});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}

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
