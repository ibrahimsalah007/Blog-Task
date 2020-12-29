const express = require('express');

const { getTag, getTags, addTag, updateTag, removeTag } = require('../Controller/Tag/tag.controller');
const { addTagSchema, updateTagSchema, idSchema } = require('../Validation/tag.validation');

const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { validate } = require('../middlewares/validation');

const router = express.Router();

router.get(
    '/',
    getTags
);

router.get(
    '/:id',
    validate(idSchema, 'params'),
    getTag
);

router.post(
    '/',
    ensureAuthenticated,
    validate(addTagSchema, 'body'),
    addTag
);

router.put(
    '/:id',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    validate(updateTagSchema, 'body'),
    updateTag
);
router.delete(
    '/:id',
    ensureAuthenticated,
    validate(idSchema, 'params'),
    removeTag
);

module.exports = router;
