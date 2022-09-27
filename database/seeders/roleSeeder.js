require('dotenv').config();

const logger = require('../../modules/logger');
const database = require('../database');

const Role = require('../../app/models/roleModel');

const roles = [
    new Role({
        scope: 'user',
        actions: [
            {
                affects: 'users',
                permissions: {
                    get: 'self',
                    post: 'true',
                    patch: 'self',
                    delete: 'self',
                },
            },
        ],
    }),
    new Role({
        scope: 'mod',
        actions: [
            {
                affects: 'users',
                permissions: {
                    get: 'self',
                    post: 'true',
                    patch: 'self',
                    delete: 'self',
                },
            },
        ],
    }),
    new Role({
        scope: 'admin',
        actions: [
            {
                affects: 'users',
                permissions: {
                    get: 'all',
                    post: 'true',
                    patch: 'all',
                    delete: 'all',
                },
            },
        ],
    }),
];

database.once('connected', () => {
    Role.ensureIndexes(function (err) {
        err ? console.error(`indexers error: ${err}`) : null;
    });

    roles.map(async (r, index) => {
        r.save((err, result) => {
            index != undefined ? logger.info(`role seeded: ${result}`) : null;
            err ? logger.error(`role seeding error: ${err}`) : null;
        });
    });
});
