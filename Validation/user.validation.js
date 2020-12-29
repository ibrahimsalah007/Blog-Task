const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * @AddUser Schema Validation
 */
const registerSchema = Joi.object().keys({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).min(3).max(255).required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().trim().regex(/^[0-9]{9,15}$/),
    location: Joi.string().min(1).max(60),
    avatar: Joi.string().min(1).max(255),
    title: Joi.string().min(1).max(60),
    skills: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.objectId()).required()
});

/**
 * @UpdateUser Schema Validation
 */
const updateUserSchema = Joi.object().keys({
    firstName: Joi.string().min(3).max(255),
    lastName: Joi.string().min(3).max(255),
    email: Joi.string().email({ minDomainSegments: 2 }).min(3).max(255),
    password: Joi.string().min(6).max(30),
    phone: Joi.string().trim().regex(/^[0-9]{9,15}$/),
    location: Joi.string().min(1).max(60),
    avatar: Joi.string().min(1).max(255),
    title: Joi.string().min(1).max(60),
    skills: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.objectId())
});

/**
 * @LoginUser Schema Validation
 */
const loginUserSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).min(4).max(255),
    password: Joi.string().min(5).max(30)
});

module.exports = {
    register: registerSchema,
    updateUser: updateUserSchema,
    loginUser: loginUserSchema,
}