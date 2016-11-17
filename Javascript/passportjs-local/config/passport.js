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
        });
    });

    // local-signup strategy
    // ---------------------
    // if the strategies weren't named, they would default to "local"
    passport.use('local-signup', new LocalStrategy({
            // local strategy uses username and password by default
            // -> override with email and password
            usernameField: 'email',
            passwordfield: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email', email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Email already taken!'));
                    } else {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    // TODO: complete the rest to configure passportJS

});