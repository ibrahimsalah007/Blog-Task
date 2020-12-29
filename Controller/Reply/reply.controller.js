const { getReplyById, createReply, getReplies, editReply, deleteReply } = require('./service.reply');
const { ResourceNotFoundError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getReply = async (req, res) => {
    const { commentId, replyId } = req.params;
    const reply = await getReplyById({ commentId, replyId });
    if (!reply)
        throw new ResourceNotFoundError();
    res.send(reply);
}

exports.getReplies = async (req, res) => {
    const { commentId } = req.params;
    const replies = await getReplies({ commentId });
    res.send(replies);
}

exports.addReply = async (req, res) => {
    const userId = req.user.id;
    const { commentId } = req.params;
    const { content } = req.body;
    const reply = await createReply({ content, userId, commentId });
    res.status(201).send(reply);
}

exports.updateReply = async (req, res) => {
    const userId = req.user.id;
    const { content } = req.body;
    const { commentId, replyId } = req.params;
    const reply = await editReply({ content, commentId, replyId, userId });
    if (!reply)
        throw new ResourceNotFoundError();
    res.send(reply);
}

exports.removeReply = async (req, res) => {
    const { commentId, replyId } = req.params;
    const userId = req.user.id
    const reply = await deleteReply({ commentId, replyId, userId });
    if (!reply)
        throw new ResourceNotFoundError();
    res.send(reply);
}