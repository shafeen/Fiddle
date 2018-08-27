var express = require('express');
var router = express.Router();


const simpleAuthVerify = (req, res, next) => {
    if (req.session.isAuthorized) {
        next();
    } else {
        res.status(404).send('You are not logged in.');
    }
};


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
    if (req.session.isAuthorized) {
        res.redirect('/profile')
    } else {
        res.render('login');
    }
});
router.post('/login', (req, res) => {
    if (req.body.uname ==='johndoe' &&
        req.body.psw ==='password') {
        req.session.isAuthorized = true;
        req.session.user = {
            name: 'johndoe',
            views: 0
        };
        res.redirect('/profile');
    } else {
        res.render('login', {errorMsg: 'Incorrect credentials!'});
    }
});
router.get('/logout', (req, res) => {
    req.session.isAuthorized = false;
    delete req.session.user;
    req.session.destroy();
    res.redirect('/login');
});

router.get('/profile', simpleAuthVerify, (req, res) => {
    const user = req.session.user;
    user.views += 1;
    res.render('profile',{ user: req.session.user });
});


module.exports = router;
