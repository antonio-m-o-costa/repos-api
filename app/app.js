const express = require('express');
const favicon = require('serve-favicon');
const cookie = require('cookie-parser');

const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;

const logger = require('../modules/logger');
const router = require('./routes/router');

/**
 * initializes express server
 */
const app = express();

app.use(express.json());
app.use(cookie());

// session store variable
let session;

app.use(favicon('./public/images/favicon.ico'));

app.use((req, res, next) => {
    logger.info(`request at: ${req.path}`);
    next();
});

//front page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//load router paths
app.use('/', router);

app.listen(port, () => {
    logger.info(`server running at: ${url}:${port}`);
});

module.exports = app;
