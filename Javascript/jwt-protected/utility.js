// jwt library to creating and verifying tokens
var jwt = require('jsonwebtoken');

function attachSecret(req, res, next) {
    req.jwtSecret = 'password'; // this secret should be hidden in an ENV variable
    next();
}

function verifyToken(req, res, next) {
    jwt.verify(req.query.token, req.jwtSecret, function (err, decoded) {
        if (err) {
            console.log(err.message);
            res.status(401).send(err.message);
        } else {
            // verify the token claims here
            if (decoded.foo == 'bar') {
                req.jwt = {oldToken: decoded};
            } else {
                console.log('Token has unexpected claims!');
                res.status(401).send('Token has unexpected claims!');
            }
            next();
        }
    });
}

module.exports = {
    attachSecret: attachSecret,
    verifyToken: verifyToken
};
