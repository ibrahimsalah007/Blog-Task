const DomainError = require('./domainError');
const { InternalError } = require('./internalServerError');
const { ResourceNotFoundError } = require('./resourceNotFoundError');
const { BadRequestError } = require('./badRequestError');
const { UnauthorizedError } = require('./unauthorizedError');
const { ValidationError } = require('./validationError');

module.exports = {
    DomainError,
    InternalError,
    ResourceNotFoundError,
    BadRequestError,
    UnauthorizedError,
    ValidationError
}
