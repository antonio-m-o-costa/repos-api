const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;

const bcrypt = require('bcrypt');
const logger = require('../../modules/logger');

const User = require('../models/userModel');

// TODO: update response codes

/**
 * @function [users/] (get) index list all users (soft deleted excluded)
 * ---
 * @param {*} req none
 * @param {*} res list of users
 * ---
 * admin sees soft deleted users
 */
const index = async (req, res) => {
    try {
        const users = await User.find(isAdmin(req));
        const clean = users.map((user) => {
            return {
                id: user._id,
                username: user.username,
                role: user.role,
                created: user.created,
                profile: {
                    path: `${url}:${port}/users/${user._id}`,
                    method: 'GET',
                },
            };
        });
        logger.info(`list users [${clean}]`);
        res.status(200).json({
            status: 'success',
            message: clean,
        });
    } catch (err) {
        logger.error(`listing users error [${err}]`);
        res.status(400).json({
            status: 'error',
            message: `error fetching users`,
        });
    }
};

/**
 * @function [users/:id] (get) show user by id (exclude soft deleted)
 * ---
 * @param {*} req user id param
 * @param {*} res show user data
 * ---
 * admin sees soft deleted users
 */
const read = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById({
            _id: id,
            'deleted.0': { $exists: false },
        });
        logger.info(`read user: ${user}`);
        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        logger.error(`reading user error: ${err}`);
        res.status(400).json({ status: 'error', message: err });
    }
};

/**
 * @function [users/:id] (patch) update user by id (soft deleted can be edited by admin)
 * ---
 * @param {*} req user id param and data in body to be updated
 * @param {*} res shows updated user
 * ---
 * role can only be updated by admin
 */
const update = async (req, res) => {
    // deny role update unless admin
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

/**
 * @function [users/:id] (delete) delete user
 * ---
 * @param {*} req user id param and hard key in body for hard delete
 * @param {*} res shows deleted user id
 * ---
 * only admin can hard delete users (hard key required)
 */
const remove = async (req, res, next) => {
    // if admin check body for hard key
    // soft delete without hard key
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

/**
 * @function [users/] (post) create new users
 * ---
 * @param {*} req [username, password] in body
 * @param {*} res created user name
 * ---
 * admin can create users with roles
 */
const create = async (req, res) => {
    // only admin session can create users with roles
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

/**
 * check if the user is admin
 */
const isAdmin = (req) => {
    const admin = req.session.user.role == 'admin';
    logger.warning(`is admin [${admin}]`);
    if (admin) {
        return {};
    } else {
        return {
            'deleted.at': { $exists: false },
        };
    }
};

module.exports = {
    index,
    read,
    update,
    remove,
    create,
};
