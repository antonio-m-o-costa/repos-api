const express = require('express');
const favicon = require('serve-favicon');
const session = require('express-session');

const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;

const logger = require('../modules/logger');
const router = require('./router/router');

const timer = 1000 * 60 * 60 * 12; // 12 hours
const secret = process.env.SECRET_KEY;

/**
 * initializes express server
 */
const app = express();

app.use(express.json());

app.use(
    session({
        secret: secret,
        saveUninitialized: true,
        cookie: { maxAge: timer },
        resave: false,
        name: 'cookie',
    })
);

app.use(favicon('./public/images/favicon.ico'));

app.use((req, res, next) => {
    logger.info(`request at: ${req.path}`);
    // console.log(req.session.cookie);
    next();
});

//front page
app.get('/', (req, res) => {
    res.send(req.session); // to remove later
});

//load router paths
app.use('/', router);

app.listen(port, () => {
    logger.info(`server running at: ${url}:${port}`);
});

module.exports = app;
