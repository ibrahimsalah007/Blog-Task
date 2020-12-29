const express = require('express');

const { getPost, getPosts, addPost, updatePost, removePost, getPostViewers } = require('../Controller/Post/post.controller');
const { addPostSchema, updatePostSchema, idSchema } = require('../Validation/post.validation');

const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { validate } = require('../middlewares/validation');
const { valid } = require('@hapi/joi');

const router = express.Router();

router.get(
    '/',
    getPosts
);

router.get(
    '/:id',
    validate(idSchema, 'params'),
    getPost
);

router.get(
    '/viewers/:id',
    validate(idSchema, 'params'),
    getPostViewers
);

router.post(
    '/',
    ensureAuthenticated,
    validate(addPostSchema, 'body'),
    addPost
);

router.put(
    '/:id',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    validate(updatePostSchema, 'body'),
    updatePost
);
router.delete(
    '/:id',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    removePost
);

module.exports = router;
