const bcrypt = require('bcrypt');

const logger = require('../../modules/logger');
const session = require('../middleware/session');

const User = require('../models/userModel');

// TODO: update response codes

const index = async (req, res, next) => {
    try {
        const users = await User.find();
        logger.info(`list users: ${users}`);
        res.status(200).json({ status: 'success', data: users });
    } catch (err) {
        logger.error(`listing users error: ${err}`);
        res.status(400).json({ status: 'error', message: err });
    }
};

const read = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById({ _id: id });
        logger.info(`read user: ${user}`);
        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        logger.error(`reading user error: ${err}`);
        res.status(400).json({ status: 'error', message: err });
    }
};

const update = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate({ _id: id }, req.body);
        logger.info(`updated user. ${user}`);
        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        logger.error(`updating user error: ${err}`);
        res.status(400).json({ status: 'error', message: 'user not found' });
    }
};

const remove = async (req, res, next) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete({ _id: id });
        logger.info(`removed user whit id: ${id}`);
        res.status(200).json({ status: 'success', data: id });
    } catch (err) {
        logger.error(`deleting user error: ${err}`);
        res.status(400).json({ status: 'error', message: 'user not found' });
    }
};

const create = async (req, res) => {
    const password = req.body.password;
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = await User.create({
                username: req.body.username,
                password: hash,
                email: req.body.email,
            });
            user.save();
            logger.info(`created user ${user}`);
            res.status(200).json({ status: 'success', data: user });
        });
    } catch (err) {
        logger.error(`creating user error: ${err}`);
        res.status(400).json({
            status: 'error',
            message: 'could not create user',
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        if (!user) {
            logger.error(`invalid username: ${req.body.username}`);
            res.status(400).json({
                status: 'error',
                message: 'invalid username provided',
            });
        } else {
            bcrypt.compare(
                user.password,
                req.body.password,
                async (err, result) => {
                    if (result) {
                        session = req.session;
                        session.user.id = user._id;
                        session.user.username = user.username;
                        session.user.role = user.role;
                        logger.info(`user session: ${session.user}`);
                        res.status(200).json({
                            status: 'success',
                            data: user,
                        });
                    } else {
                        logger.error(`invalid password: ${req.body.password}`);
                        res.status(400).json({
                            status: 'error',
                            message: 'invalid password provided',
                        });
                    }
                }
            );
        }
    } catch (err) {
        logger.error(`login failed: ${err}`);
        res.status(400).json({
            status: 'error',
            message: 'could not login user',
        });
    }
};

const logout = async (req, res) => {
    logger.info(`session destroyed: ${req.session}`);
    req.session.destroy();
    res.status(200).json({
        status: 'success',
        message: 'user logged out',
    });
    // res.redirect('/');
};

module.exports = {
    index,
    read,
    update,
    remove,
    create,
    login,
    logout,
};
