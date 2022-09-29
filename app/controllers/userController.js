const bcrypt = require('bcrypt');
const logger = require('../../modules/logger');

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

module.exports = {
    index,
    read,
    update,
    remove,
    create,
};
