var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var sequelize = new Sequelize({
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './db.sqlite3'
});

var User = require('../models/user.model')(sequelize);
var Address = require('../models/address.model')(sequelize);

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test/sqlite/define/', function(req, res) {
    sequelize.sync().then(function () {
        res.send("sync complete");
    });
});

router.get('/test/sqlite/create/address', function(req, res, next) {
    sequelize.sync().then(function() {
        return Address.create({
            address: '1 Infinite Loop, Cupertino CA'
        });
    }).then(function(address) {
        console.log(address.get({ plain: true }));
        return User.create({
            username: 'johndoe',
            birthday: new Date(1980, 6, 20),
            addressId: address.id
        })
    }).then(function (user) {
        console.log(user.get({ plain: true }));
        res.json(user);
    });
});

router.get('/test/sqlite/find/user/:name', function(req, res) {
    var User = sequelize.define('user', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
    });
    User.findOne({
        attributes: ['username', 'birthday'],
        where: {
            username: req.params.name
        }
    }).then(function (user) {
        if (user) {
            console.log("found a user: %s", user.get({plain: true}));
        }
        res.json(user);
    });
});

router.get('/test/sqlite/find/address/:id', function(req, res) {
    var Address = sequelize.define('address', {
        address: Sequelize.STRING
    });

    Address.findOne({
        attributes: ['id', 'address'],
        where: {
            id: req.params.id
        }
    }).then(function (address) {
        if (address) {
            console.log("found an address: %s", address.get({plain: true}));
        }
        res.json(address);
    });
});


module.exports = router;
