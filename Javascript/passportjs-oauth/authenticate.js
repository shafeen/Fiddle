var express  = require('express');
var router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


router.use('/', passport.initialize());

// TODO: write a better de/serializer?
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
var secrets = require('./secrets.json'); // create this file containing your google api info
passport.use(new GoogleStrategy({
        clientID: secrets.GOOGLE_CONSUMER_KEY,
        clientSecret: secrets.GOOGLE_CONSUMER_SECRET,
        callbackURL: "/authenticate/google/callback/"
    },
    function(token, tokenSecret, profile, done) {
        user = {
            id: profile.id
        };
        return done(null, user);
        // TODO: actually create this function (User.findOrCreate)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));

// TODO: serve the log-in page here
router.get('/login/', function (req, res) {
    var authOptions = [
        {
            provider: 'Google',
            authUrl: '/authenticate/google',
            btn2ndClass: 'btn-danger',
            span2ndClass: 'fa-google-plus'
        },
        {
            provider: 'facebook',
            authUrl: '/authenticate/facebook',
            btn2ndClass: 'btn-primary',
            span2ndClass: 'fa-facebook'
        }
    ];

    res.render('login', {
        pageTitle: 'Node Authentication',
        authOptions: authOptions
    });
});

// GET /authenticate/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// TODO: update the "scope" parameter
router.get('/google/',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GET /authenticate/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback/',
    passport.authenticate('google', {
        successRedirect: '/authenticate/google/success/',
        failureRedirect: '/authenticate/login/'
    })
);

// TODO: invoke this route after a successful login
router.get('/google/success/', function (req, res) {
    res.send('Successfully logged in with Google!' )
});

module.exports = router;
