const bcrypt = require('bcrypt');
const logger = require('../../modules/logger');

const User = require('../models/userModel');

// TODO: update response codes

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
            logger.info(`pass: ${user.password}`);
            bcrypt.compare(
                req.body.password,
                user.password,
                async (err, result) => {
                    if (result) {
                        req.session.user = {
                            id: user._id.toString(),
                            username: user.username,
                            role: user.role,
                        };
                        console.log(req.session.user);
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
    login,
    logout,
};
