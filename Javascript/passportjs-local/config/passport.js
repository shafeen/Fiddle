var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.model');

module.exports(function (passport) {


    // passport session setup
    // ----------------------
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });

    // local signup strategy
    // ---------------------
    // if the strategies weren't named, it would default to "local"
    passport.use('local-signup', new LocalStrategy({
            // local strategy uses username and password by default
            // -> override with email and password
            usernameField: 'email',
            passwordfield: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // TODO: complete the rest to configure passportJS
        }
    ));


});