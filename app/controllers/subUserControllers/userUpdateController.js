const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;

const bcrypt = require('bcrypt');
const logger = require('../../modules/logger');

const User = require('../models/userModel');

// TODO: update response codes

/**
 * @function [users/:id] (patch) update user by id (soft deleted can be edited by admin)
 * ---
 * @param {*} req user id param and data in body to be updated
 * @param {*} res shows updated user
 * ---
 * user can only update it self,
 * mod can update any user with exception of admin
 * role can only be updated by admin
 */
const update = async (req, res) => {
    const id = req.params.id;
    const activeUser = req.session.user;
    let role;
    logger.info(`data to update ${req.body}`);
    try {
        if (activeUser.role != 'admin') {
            const userToEdit = await User.findOne({
                _id: id,
                'deleted.at': { $exists: false },
            });
            logger.info(`user to update ${userToEdit}`);
        }
        switch (activeRole) {
            case 'user':
                if (activeUser.id != userToEdit._id || req.body.role) {
                    res.status(400).json({
                        status: 'error',
                        message:
                            'you can only edit yourself, you can not change your role',
                    });
                } else {
                    updateUser();
                }
                break;
            case 'mod':
                if (userToEdit.role == 'admin' || req.body.role) {
                    res.status(400).json({
                        status: 'error',
                        message:
                            'you can not edit admin users, you can not change user roles',
                    });
                } else {
                    updateUser();
                }
                break;
            case 'admin':
                role = req.body.role;
                updateUser();
                break;
            default:
                res.status(400).json({
                    status: 'error',
                    message: 'something went very wrong',
                    contact: 'suport@example.com',
                });
                break;
        }
    } catch (err) {
        logger.error(`updating user error ${err}`);
        res.status(400).json({
            status: 'error',
            message: 'user could not be found',
        });
    }

    const updateUser = () => {
        const password = req.body.password;
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = await User.findOneAndUpdate(
                { _id: id },
                {
                    username: req.body.username,
                    password: hash,
                    role: role,
                },
                (err, result) => {
                    if (err) {
                        let msg;
                        if (err.code === 11000) msg = 'user already exists';
                        else msg = err.errors.username.message;
                        logger.error(`updating user error ${err}`);
                        res.status(400).json({
                            status: 'error',
                            message: msg,
                        });
                    } else {
                        logger.info(`updated user ${req.body.username}`);
                        res.status(200).json({
                            status: 'success',
                            message: `user updated [${req.body.username}] successfully`,
                            options: {
                                profile: {
                                    path: `${url}:${port}/users/${user.id}`,
                                    method: 'GET',
                                },
                            },
                        });
                    }
                }
            );
        });
    };
};

module.exports = { update };
