require('dotenv').config();

const bcrypt = require('bcrypt');
const logger = require('../../modules/logger');
const database = require('../database');

const User = require('../../app/models/userModel');

const users = [
    new User({
        username: 'regularUser',
        password: bcrypt.hash('!1Apassword', 10),
        email: 'regular@user.api',
    }),
    new User({
        username: 'Moderator',
        password: bcrypt.hash('?2Bpassword', 10),
        email: 'mod@repos.api',
        role: 'mod',
    }),
    new User({
        username: 'apiAdmin',
        password: bcrypt.hash('Kl1!jadmin', 10),
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
