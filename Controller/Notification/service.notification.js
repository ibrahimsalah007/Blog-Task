
const Notification = require('../../Models/Notification');
const Post = require('../../Models/Post');

const { InternalError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getNotificationById = async (_id, userId) => {
    const notification = await Notification.findOne({ _id, author: userId })
        .populate('author')
    return notification;
}

exports.getNotifications = async (userId) => {
    const notifications = await Notification.find({ author: userId })
        .populate('author')
        .sort({ createdAt: -1 });
    return notifications;
}