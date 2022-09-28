const url = process.env.SERVER_URL;

/**
 * session checker middleware
 */
const auth = function (req, res, next) {
    if (req.session && req.session.id && req.session.role)
        return next(req.session.id, req.session.role);
    else
        return res.status(400).json({
            status: 'error',
            message: 'authentication required',
            link: `${url}/users/login`,
            method: 'POST',
            body: {
                username: 'username',
                password: 'password',
            },
        });
};

module.exports = auth;
