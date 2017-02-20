var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ng-component-test' });
});

router.get('/cards/refresh/', function (req, res) {
    res.json([
        {
            cost: 5,
            title: 'The Emperor\'s Champion',
            imgUrl: 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/095-the-emperors-champion.jpg',
            traits: ['Soldier', 'Black Templars', 'Elite']
        },
        {
            cost: 1,
            title: 'Vow of Honor',
            imgUrl: 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/097-vow-of-honor.jpg',
            traits: ['Power', 'Vow']
        },
        {
            cost: 3,
            title: 'Reclusiam Templars',
            imgUrl: 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/094-reclusiam-templars.jpg',
            traits: ['Soldier', 'Black Templars']
        }
    ]);
});


module.exports = router;
