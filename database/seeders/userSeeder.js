require('dotenv').config();

const User = require('../../app/models/user');
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
    }),
    new User({
        username: 'apiAdmin',
        password: 'Kl1!jadmin',
        email: 'admin@urepos.api',
    }),
];

database.once('connected', () => {
    users.map(async (u, index) => {
        u.save((err, result) => {
            err ? logger.error(`user seeding error > ${err}`) : null;
            index === users.length - 1
                ? logger.info(`user seeding done > ${result}`)
                : null;
        });
    });
});
