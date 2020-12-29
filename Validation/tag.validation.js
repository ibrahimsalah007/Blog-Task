const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * @AddPost Schema Validation
 */
const addTagSchema = Joi.object().keys({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(1024).required()
});

/**
 * @UpdateUser Schema Validation
 */
const updateTagSchema = Joi.object().keys({
    name: Joi.string().min(2).max(255),
    description: Joi.string().max(1024).required()
});

/**
 * @UpdateUser Schema Validation
 */
const idSchema = Joi.object().keys({
    id: Joi.objectId()
});


module.exports = {
    addTagSchema,
    updateTagSchema,
    idSchema
}