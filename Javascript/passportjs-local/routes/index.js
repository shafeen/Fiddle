var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/login');
});

router.get('/login', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else {
        res.render('index', { title: 'Welcome Users', loginMsg: req.flash('loginMessage') });
    }
});

router.get('/signup', function (req, res) {
    res.render('signup', {title: 'Create New User', signupMsg: req.flash('signupMessage')});
});

//we want this protected so you have to be logged in to visit
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        title: 'Success',
        welcomeMsg: 'Welcome to your profile!',
        user: req.user
    });
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
