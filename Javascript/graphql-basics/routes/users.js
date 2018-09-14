const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, {_id: true, 'local.email': true}).exec()
    .then(userList => {
        res.status(200).json(userList);
    }).catch(reason => {
        res.status(500).send('Request failed');
    });

});

module.exports = router;
