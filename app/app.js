const express = require('express');
const favicon = require('serve-favicon');

const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;

const logger = require('../modules/logger');

/**
 * initializes express server
 */
const app = express();

app.use(express.json());

app.use(favicon('./public/images/favicon.ico'));

app.use((req, res, next) => {
    logger.info('request at: ' + req.path);
    next();
});

//front page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    logger.info(`server running at: ${url}:${port}`);
});

module.exports = app;
