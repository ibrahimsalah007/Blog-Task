const DomainError = require('./domainError');

class ValidationError extends DomainError {
    statusCode
    err;
    constructor(err, statusCode) {
        super('Validation Error');
        this.statusCode = statusCode || 400
        this.err = err || [];
    }
    serializeErrors() {
        return {
            name: this.name,
            statusCode: this.statusCode,
            errors: this.err
        };
    }
}

module.exports = { ValidationError };