const express = require('express');

const { getReply, getReplies, addReply, updateReply, removeReply } = require('../Controller/Reply/reply.controller');
const { addReplySchema, updateReplySchema, idSchema } = require('../Validation/reply.validation');

const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { validate } = require('../middlewares/validation');

const router = express.Router();

router.get(
    '/:commentId',
    getReplies
);

router.get(
    '/:commentId/:replyId',
    validate(idSchema, 'params'),
    getReply
);

router.post(
    '/:commentId',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    validate(addReplySchema, 'body'),
    addReply
);

router.put(
    '/:commentId/:replyId',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    validate(updateReplySchema, 'body'),
    updateReply
);

router.delete(
    '/:commentId/:replyId',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    removeReply
);

module.exports = router;