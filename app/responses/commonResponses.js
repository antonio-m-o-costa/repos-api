const authReqMsg = () => {
    return {
        status: 'error',
        message: 'authentication required',
        options: {
            login: {
                path: 'http://127.0.0.1:3000/auth/login',
                method: 'POST',
                body: {
                    username: 'username',
                    password: 'password',
                },
            },
        },
    };
};

module.exports = { authReqMsg };
