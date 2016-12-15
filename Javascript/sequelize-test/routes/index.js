var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './db.sqlite3'
});

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test/sqlite/', function(req, res, next) {
    var User = sequelize.define('user', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
    });

    var Address = sequelize.define('address', {
        address: Sequelize.STRING
    });

    Address.hasMany(User, {as: 'occupant'});

    sequelize.sync().then(function() {

        return User.create({
            username: 'johndoe',
            birthday: new Date(1980, 6, 20)
        });
    }).then(function(jane) {
        console.log(jane.username);
        console.log(jane.birthday);
    });
});

module.exports = router;
