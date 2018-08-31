var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));
let sessionStore = new RedisStore({
    host: 'localhost', port: 6379, ttl: 60 * 15
});
const sessionMiddleware = session({
    store: new RedisStore({
        host: 'localhost', port: 6379, ttl: 60*15
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
});
const sessionInitWithRetry = function (req, res, next) {
    let tries = 3;
    function lookupSession(error) {
        if (error) {
            return next(error);
        }
        tries -= 1;
        if (req.session !== undefined) {
            return next()
        }
        if (tries < 0) {
            return next(new Error('Oh no! Unable to initialize your session store'))
        }
        sessionMiddleware(req, res, lookupSession)
    }
    lookupSession()
};
// app.use(sessionMiddleware);
app.use(sessionInitWithRetry);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
