const express = require('express');
const router = express.Router();

const {
    index,
    read,
    update,
    remove,
    create,
} = require('../../controllers/userController');

router.route('/').get(index).post(create);

router.route('/:id').get(read);

router.route('/:id/:action').patch(update).delete(remove);

module.exports = router;
