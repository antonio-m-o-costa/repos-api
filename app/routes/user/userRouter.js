const express = require('express');
const router = express.Router();
const session = require('../../middleware/session');

const {
    index,
    create,
    read,
    update,
    remove,
} = require('../../controllers/userController');

router.route('/').get(session, index).post(create);

router.route('/:id').get(read).patch(update).delete(remove);

router.route('/login').post(login);

router.route('/logout').post(logout);

module.exports = router;
