const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * @AddReply Schema Validation
 */
const addReplySchema = Joi.object().keys({
    content: Joi.string().max(20000).required(),
});

/**
 * @UpdateReply Schema Validation
 */
const updateReplySchema = Joi.object().keys({
    content: Joi.string().max(20000),
});

/**
 * @UpdateUser Schema Validation
 */
const idSchema = Joi.object().keys({
    commentId: Joi.objectId(),
    replyId: Joi.objectId()
});


module.exports = {
    addReplySchema,
    updateReplySchema,
    idSchema
}