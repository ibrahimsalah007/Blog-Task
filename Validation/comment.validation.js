const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * @AddPost Schema Validation
 */
const addCommentSchema = Joi.object().keys({
    content: Joi.string().max(20000).required(),
});

/**
 * @UpdateUser Schema Validation
 */
const updateCommentSchema = Joi.object().keys({
    content: Joi.string().max(20000),
});

/**
 * @UpdateUser Schema Validation
 */
const idSchema = Joi.object().keys({
    postId: Joi.objectId(),
    commentId: Joi.objectId()
});


module.exports = {
    addCommentSchema,
    updateCommentSchema,
    idSchema
}