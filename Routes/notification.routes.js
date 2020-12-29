const express = require('express');

const { getNotification, getNotifications } = require('../Controller/Notification/notification.controller');

const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { validate } = require('../middlewares/validation');

const router = express.Router();

router.get(
    '/',
    ensureAuthenticated,
    getNotifications
);

router.get(
    '/:id',
    ensureAuthenticated,
    getNotification
);

module.exports = router;
