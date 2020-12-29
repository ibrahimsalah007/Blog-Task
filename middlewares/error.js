const { DomainError } = require('../Handlers/ErrorHandler/errorsBearer');

exports.error = (err, req, res, next) => {
    if (err instanceof DomainError) {
        return res.status(err.statusCode).send({ error: err.serializeErrors() });
    }
    console.log(err.message);
    res.status(400).json({
        error: [{
            name: 'UnknwonError', message: 'Something went wrong', statusCode: 400
        }]
    });
};
