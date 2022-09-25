require('dotenv').config();

const User = require('../../app/models/userModel');
const logger = require('../../modules/logger');

const database = require('../database');

const users = [
    new User({
        username: 'regularUser',
        password: '!1Apassword',
        email: 'regular@user.api',
    }),
    new User({
        username: 'Moderator',
        password: '?2Bpassword',
        email: 'mod@repos.api',
        role: 'mod',
    }),
    new User({
        username: 'apiAdmin',
        password: 'Kl1!jadmin',
        email: 'admin@urepos.api',
        role: 'admin',
    }),
];

database.once('connected', () => {
    User.ensureIndexes(function (err) {
        err ? logger.error(`indexers error: ${err}`) : null;
    });

    users.map(async (u, index) => {
        u.save((err, result) => {
            index != undefined ? logger.info(`user seeded: ${result}`) : null;
            err ? logger.error(`user seeding error: ${err}`) : null;
        });
    });
});
