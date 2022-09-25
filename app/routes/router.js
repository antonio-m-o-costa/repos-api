const express = require('express');
const router = express.Router();

const userRouter = require('./user/userRouter');

const routing = express();

routing.use('/users', userRouter);

module.exports = routing;
