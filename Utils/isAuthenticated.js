const JWT = require('jsonwebtoken');

const User = require('../Models/User');
const KEYS = require('../Config/Keys');

const {
    InternalError
} = require('../Handlers/ErrorHandler/errorsBearer');

const isAuthenticated = async (token) => {
    try {
        const userPayload = JWT.verify(token, KEYS.JWT_KEY);
        const user = await User.findById(userPayload.id);
        if (!user)
            return null;
        return user;
    } catch (err) {
        throw new InternalError(err.message);
    }
}

module.exports = {
    isAuthenticated,
}