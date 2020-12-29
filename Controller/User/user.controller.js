const User = require('../../Models/User');
const { findUser } = require('./Service');

// Return current user
exports.currentUser = async (req, res) => {
    const user = await findUser({ _id: req.user.id });
    res.send(user);
}

// Return all available users
exports.getUsers = async (req, res) => {

}

// Return all available users
exports.getUsers = async (req, res) => {

}