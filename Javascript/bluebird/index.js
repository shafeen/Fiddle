var express = require('express');
var app = express();

var Promise = require('bluebird');
var sqlite3 = require('sqlite3').verbose();

app.get('/', function (req, res) {
    var msg = 'nodemon is working';
    res.send(msg);
});

app.get('/adduser/new/promises/', function (req, res) {
    Promise.promisify(adduserNew)(req.query.username, res).then(function(val) {
        console.log('responding');
        res.json(val);
    }).catch(function (e) {
        console.log('erroring');
        res.status(500).json(e);
    });
});

app.get('/adduser/old/', function (req, res) {
    adduserOld(req.query.username, res);
});

app.get('/adduser/new/', function (req, res) {
    adduserNew(req.query.username, res);
});

function adduserOld(username, res) {
    console.log('adduserOld');
    var db = new sqlite3.Database('./test.db');
    db.serialize(function () {
        db.get('SELECT count(*) AS totalusers FROM users', function (err, row) {
            var responseObj = {};
            responseObj.totalUsersBefore = row.totalusers;
            responseObj.message = 'No user added.';
            var db = new sqlite3.Database('./test.db');
            db.run('INSERT INTO users (name) VALUES (?)', username, function (err) {
                responseObj.message = 'New user added.';
                res.json(responseObj);
            });
            db.close();
        });
    });
    db.close();
}

// NOTE: excluding error handling to compare with adduserOld(..)
function adduserNew(username, res, callback) {
    console.log('adduserNew');
    callback = callback? callback : res.json;
    var db = new sqlite3.Database('./test.db');
    db.get = Promise.promisify(db.get);
    db.serialize(function () {
        db.get('SELECT count(*) totalusers FROM users').then(function (row) {
            var responseObj = {};
            responseObj.totalUsersBefore = row.totalusers;
            responseObj.message = 'No user added.';
            return responseObj;
        }).then(function (responseObj){
            var db = new sqlite3.Database('./test.db');
            db.run = Promise.promisify(db.run);
            db.run('INSERT INTO users (name) VALUES (?)', username).then(function () {
                responseObj.message = 'New user added.';
                callback(responseObj);
            });
            db.close();
        });
    });
    db.close();
}

app.get('/numusers/', function (req, res) {
    getNumUsers('./test.db').then(function(numusers) {
        res.send(numusers + ' users');
    }).catch(function (e) {
        res.status(500).send('server error');
    });
});

function getNumUsers(dbPath) {
    return (Promise.promisify(function (dbPath, callback) {
        var db = new sqlite3.Database(dbPath);
        db.serialize(function () {
            db.get('SELECT count(*) AS totalusers FROM users', function (err, row) {
                var totalusers = row? row.totalusers: null;
                callback(err, totalusers);
            });
        });
        db.close();
    }))(dbPath);
}

app.get('/insertuser/', function (req, res) {
    insertNewUser('./test.db', req.query.username).then(function (userId) {
        res.send('inserted new user with id = ' + userId);
    }).catch(function (err) {
        res.status(500).send('server could not insert user');
    });
});

function insertNewUser(dbPath, username) {
    return Promise.promisify(function (dbPath, username, callback) {
        var db = new sqlite3.Database(dbPath);
        db.serialize(function () {
            db.run('INSERT INTO users (name) VALUES (?)', username, function (err) {
                var lastId = (!err)? this.lastID: null;
                callback(err, lastId);
            });
        });
        db.close();
    })(dbPath, username);
}

app.listen(3000, function () {
    console.log('bluebird test app listening on port 3000!');
});