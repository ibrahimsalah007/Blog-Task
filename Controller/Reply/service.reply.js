
const Reply = require('../../Models/Reply');
const Comment = require('../../Models/Comment');

const { InternalError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getReplyById = async ({replyId, commentId}) => {
    const reply = await Reply.findOne({ _id: replyId, comment: commentId })
        .populate('author');
    return reply;
}

exports.getReplies = async ({ commentId }) => {
    const replies = await Reply.find({ comment: commentId })
        .populate('author');
    return replies;
}

exports.createReply = async (data) => {
    const {
        content,
        commentId: comment,
        userId: author
    } = data;


    const reply = new Reply({
        content,
        comment,
        author
    });
    try {
        //Saving Comment
        await reply.save();
        await Comment.findByIdAndUpdate(comment, { $inc: { reply: 1 } });
        return reply;
    } catch (err) {
        console.log(err.message);
        throw new InternalError();
    }
}

exports.editReply = async (data) => {
    const { commentId, replyId, userId, content } = data;
    try {
        const reply = await Reply.findOneAndUpdate({
            _id: replyId,
            comment: commentId,
            author: userId
        },
            {
                content
            },
            {
                new: true
            })
            .populate('author');
        return reply;
    } catch (err) {
        throw new InternalError()
    }
}

exports.deleteReply = async (data) => {
    try {
        const { commentId, replyId, userId } = data;
        const reply = await Reply.findOneAndDelete({ _id: replyId, comment: commentId, author: userId });
        await Comment.findByIdAndUpdate(commentId, { $inc: { reply: -1 } });
        return reply;
    } catch (err) {
        throw new InternalError()
    }
}

