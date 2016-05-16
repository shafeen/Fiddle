var express = require('express');
var app = express();

var Promise = require('bluebird');
var sqlite3 = require('sqlite3').verbose();

app.get('/', function (req, res) {
    var msg = 'nodemon is working';
    res.send(msg);
});

app.get('/adduser/', function (req, res) {
    adduser(req.query.username).then(function (responseObj) {
        res.status(201).json(responseObj);
    }).catch(function (responseObj) {
        res.status(500).json(responseObj);
    });
});

function adduser(username) {
    return new Promise(function (resolve, reject) {
        getNumUsers('./test.db').then(function (currentNumUsers) {
            insertNewUser('./test.db', username).then(function (newUserId) {
                resolve({
                    message: 'new user added',
                    previousNumUsers: currentNumUsers,
                    user: {
                        id: newUserId,
                        name: username
                    }
                });
            }).catch(function (err) {
                reject({
                    message: 'could not add a new user',
                    previousNumUsers: currentNumUsers
                });
            });
        }).catch(function (err) {
            reject({
                message: 'could not check current number of users'
            });
        });
    });
}

function getNumUsers(dbPath) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database(dbPath);
        db.serialize(function () {
            db.get('SELECT count(*) AS totalusers FROM users', function (err, row) {
                if (row) {
                    resolve(row.totalusers);
                } else {
                    reject(err);
                }
            });
        });
        db.close();
    });
}

function insertNewUser(dbPath, username) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database(dbPath);
        db.serialize(function () {
            db.run('INSERT INTO users (name) VALUES (?)', username, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
        db.close();
    });
}

app.listen(3000, function () {
    console.log('bluebird test app listening on port 3000!');
});