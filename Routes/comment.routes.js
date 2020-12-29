const express = require('express');

const { getComment, getComments, addComment, updateComment, removeComment } = require('../Controller/Comment/comment.controller');
const { addCommentSchema, updateCommentSchema, idSchema } = require('../Validation/comment.validation');

const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { validate } = require('../middlewares/validation');

const router = express.Router();

router.get(
    '/:postId',
    getComments
);

router.get(
    '/:postId/:commentId',
    validate(idSchema, 'params'),
    getComment
);

router.post(
    '/:postId',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    validate(addCommentSchema, 'body'),
    addComment
);

router.put(
    '/:postId/:commentId',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    validate(updateCommentSchema, 'body'),
    updateComment
);

router.delete(
    '/:postId/:commentId',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    removeComment
);

module.exports = router;
