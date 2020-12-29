const JWT = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');


const KEYS = require('../../Config/Keys');
const User = require('../../Models/User');

exports.findUser = async (query) => {
    const user = await User.findOne(query);
    return user;
}

exports.createUser = async (data) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        location,
        skills,
        tags,
        title
    } = data;

    const user = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        location,
        skills,
        tags,
        title
    });

    await user.save()
    return user;
}

/**
 * @method compareUserPassword Description.
 * Compare user`s password with a given password.
 * @param candidatePassword a given password.
 * @param userPassword stored password.
 */
exports.compareUserPassword = async (candidatePassword, userPassword) => {

    const isMatch = await Bcrypt.compare(candidatePassword, userPassword);
    return isMatch;
};

/**
 * @method generateAuthToken Description.
 * Generate Access token
 * @param user existing user object.
 */
exports.generateAuthToken = async (user) => {

    const token = JWT.sign({
        id: user.id,
        name: user.fullName,
        email: user.email
    }, KEYS.JWT_KEY, { expiresIn: '30d' });

    return token;
};