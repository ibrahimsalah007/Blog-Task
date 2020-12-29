const JWT = require('jsonwebtoken');

const User = require('../Models/User');
const KEYS = require('../Config/Keys');

const {
    UnauthorizedError,
    BadRequestError,
    InternalError
} = require('../Handlers/ErrorHandler/errorsBearer');

const ensureAuthenticated = async (req, res, next) => {
    if (!req.header('x-token'))
        throw new UnauthorizedError('UnAuthorized or Invalid token.');
    let userPayload;
    try {
        userPayload = JWT.verify(req.header('x-token'), KEYS.JWT_KEY);
    } catch (err) {
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')
            throw new BadRequestError('Invalid or expired token');
        else
            throw new InternalError(err.message);
    }
    req.user = userPayload;
    const user = await User.findById(req.user.id);
    if (!user)
        throw new BadRequestError('Invalid User Credentials');
    // move to next Middleware.
    next();

}
const forwardAuthenticated = async (req, res, next) => {
    if (!req.session.jwt)
        next();
    else
        throw new BadRequestError('Logged-in already.');

}

module.exports = {
    ensureAuthenticated,
    forwardAuthenticated
}