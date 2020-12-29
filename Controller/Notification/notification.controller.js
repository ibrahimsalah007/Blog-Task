const { getNotificationById, getNotifications } = require('./service.notification');
const { ResourceNotFoundError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getNotification = async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user;
    const notification = await getNotificationById(notificationId, userId);
    if (!notification)
        throw new ResourceNotFoundError();
    res.send(notification);
}

exports.getNotifications = async (req, res) => {
    const userId = req.user.id;
    const notifications = await getNotifications(userId);
    res.send(notifications);
}
