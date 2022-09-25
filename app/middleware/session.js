const sessions = require('express-session');

// 12 hours
const timer = 1000 * 60 * 60 * 12;

/**
 * session middleware
 */
const session = sessions({
    secret: 'rep0s4P1se55ionK3y',
    saveUninitialized: true,
    cookie: { maxAge: timer },
    resave: false,
});

module.exports = session;
