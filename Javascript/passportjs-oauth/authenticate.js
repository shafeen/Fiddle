var express  = require('express');
var router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// TODO: THIS IS STILL NON-FUNCTIONAL!!!


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
var secrets = require('./secrets.json'); // create this file containing your google api info
passport.use(new GoogleStrategy({
        consumerKey: secrets.GOOGLE_CONSUMER_KEY,
        consumerSecret: secrets.GOOGLE_CONSUMER_SECRET,
        callbackURL: "/authenticate/google/callback/"
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

// TODO: serve the log-in page here
router.get('/login/', function (req, res) {
    res.send('log in with Google here');
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// TODO: update the "scope" parameter
router.get('/google/',
    passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/authenticate/login' }),
    function(req, res) {
        console.log('got here after passport authentication');
        res.redirect('/google/success/');
    }
);

// TODO: invoke this route after a successful login
router.get('/google/success/', function (req, res) {
    res.send('Successfully logged in with Google!')
});

module.exports = router;
