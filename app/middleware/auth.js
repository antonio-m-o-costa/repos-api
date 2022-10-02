const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;

const logger = require('../../modules/logger');

const User = require('../models/userModel');

/**
 * session checker middleware -
 * allows access or responds
 * with authentication required message
 */
const auth = async (req, res, next) => {
    const session = req.session.user;
    if (session) {
        logger.info(`session checker ${session}`);
        try {
            const user = await User.findById({
                _id: session.id,
                'deleted.0': { $exists: false },
            });
            logger.info(`found user [${user.username}]`);
            user.username ? next() : null;
        } catch (err) {
            logger.error(`reading session error [${err}]`);
            res.status(400).json({
                status: 'error',
                message: 'session error',
            });
        }
    } else {
        return res.status(400).json({
            status: 'error',
            message: 'authentication required',
            options: {
                login: {
                    path: `${url}:${port}/auth/login`,
                    method: 'POST',
                    body: {
                        username: 'username',
                        password: 'password',
                    },
                },
            },
        });
    }
};

module.exports = auth;
