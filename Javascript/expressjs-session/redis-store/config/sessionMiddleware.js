const session = require('express-session');
const MemoryStore = session.MemoryStore;
const RedisStore = require('connect-redis')(session);

const MEMORY_STORE = 'memory';
const REDIS_STORE = 'redis';

const acceptedSessionStores = new Set([
    REDIS_STORE, MEMORY_STORE
]);

const getSessionStore = function (envSessionStore) {
    if (!acceptedSessionStores.has(envSessionStore)) {
        envSessionStore = MEMORY_STORE;
    }
    switch (envSessionStore) {
        case REDIS_STORE:
            console.log('Using a localhost redis session store');
            return new RedisStore({
                host: 'localhost', port: 6379, ttl: 60*15
            });
            break;
        case MEMORY_STORE:
        default:
            console.log('Using a memory session store (development only)');
            return new MemoryStore();
    }
};

module.exports = function (envSessionStore) {
    const sessionStore = getSessionStore(envSessionStore);
    const sessionMiddleware = session({
        store: sessionStore,
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    });
    return function sessionMiddlewareInitWithRetry(req, res, next) {
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
        lookupSession();
    };
};

