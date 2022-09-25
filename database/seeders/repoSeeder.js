require('dotenv').config();

const Repo = require('../../app/models/repo');
const logger = require('../../modules/logger');

const User = require('../../app/models/user');

const database = require('../database');

const repos = [
    new Repo({
        title: 'Repo Test One',
        text: 'Repo Test One Text',
        image: '123.png',
        created: {
            at: new Date(Date.now()),
            by: '633022bb32afb4b04a323b01',
        },
    }),
    new Repo({
        title: 'Repo Test Two',
        text: 'Repo Test Two Text',
        image: '456.png',
        created: {
            at: new Date(Date.now()),
            by: '633022bb32afb4b04a323b00',
        },
    }),
    new Repo({
        title: 'Repo Test Three',
        text: 'Repo Test Three Text',
        image: '789.png',
        created: {
            at: new Date(Date.now()),
            by: '633022bb32afb4b04a323aff',
        },
    }),
];

database.once('connected', () => {
    Repo.ensureIndexes(function (err) {
        err ? logger.error(`indexers error > ${err}`) : null;
    });

    repos.map(async (u, index) => {
        u.save((err, result) => {
            index != undefined ? logger.info(`repo seeded > ${result}`) : null;
            err ? logger.error(`repo seeding error > ${err}`) : null;
        });
    });
});

// manual _id this is not ideal
// but i cant make the seeder wait
// for the promise response
