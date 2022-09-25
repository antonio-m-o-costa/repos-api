const express = require('express');
const router = express.Router();

const userRouter = require('../routes/user/userRouter');

app.use('/users', userRouter);

module.exports = router;
