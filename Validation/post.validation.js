const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * @AddPost Schema Validation
 */
const addPostSchema = Joi.object().keys({
    title: Joi.string().min(3).max(1024).required(),
    content: Joi.string().min(3).max(40000).required(),
    cover: Joi.string(),
    slug: Joi.string().min(6).max(1024),
    tags: Joi.array().required(),
    keywords: Joi.string(),
    published: Joi.boolean(),
});

/**
 * @UpdateUser Schema Validation
 */
const updatePostSchema = Joi.object().keys({
    title: Joi.string().min(3).max(1024),
    content: Joi.string().min(3).max(40000),
    cover: Joi.string(),
    slug: Joi.string().min(6).max(1024),
    tags: Joi.array(),
    keywords: Joi.string(),
    published: Joi.boolean(),
});

/**
 * @UpdateUser Schema Validation
 */
const idSchema = Joi.object().keys({
    id: Joi.objectId()
});


module.exports = {
    addPostSchema,
    updatePostSchema,
    idSchema
}