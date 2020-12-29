const express = require('express');

const { registerUser, loginUser } = require('../Controller/User/authentication.controller');
const { currentUser } = require('../Controller/User/user.controller');
const { register } = require('../Validation/user.validation');

const { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/ensureAuthenticated');
const { validate } = require('../middlewares/validation');

const router = express.Router();

router.post(
    '/login',
    loginUser
);
router.post(
    '/register',
    validate(register, 'body'),
    registerUser
);

router.get(
    '/current',
    ensureAuthenticated,
    currentUser
);

module.exports = router;
