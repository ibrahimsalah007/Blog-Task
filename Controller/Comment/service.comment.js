
const Comment = require('../../Models/Comment');
const Post = require('../../Models/Post');

const { InternalError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getCommentById = async (_id, postId) => {
    const comment = await Comment.findOne({ _id, post: postId })
        .populate('author');
    return comment;
}

exports.getComments = async (postId) => {
    const comments = await Comment.find({ post: postId })
        .populate('author');
    return comments;
}

exports.createComment = async (data) => {
    const {
        content,
        postId: post,
        userId: author
    } = data;


    const comment = new Comment({
        content,
        post,
        author
    });
    try {
        //Saving Comment
        await comment.save();
        await Post.findByIdAndUpdate(post, { $inc: { comments: 1 } });
        return comment;
    } catch (err) {
        console.log(err.message);
        throw new InternalError();
    }
}

exports.editComment = async (data) => {
    const { commentId, postId, userId, content } = data;
    try {
        const comment = await Comment.findOneAndUpdate({
            _id: commentId,
            post: postId,
            author: userId
        },
            {
                content
            },
            {
                new: true
            })
            .populate('author');
        return comment;
    } catch (err) {
        throw new InternalError()
    }
}

exports.deleteComment = async (data) => {
    try {
        const { commentId, postId, userId } = data;
        const comment = await Comment.findOneAndDelete({ _id: commentId, post: postId, author: userId });
        await Post.findByIdAndUpdate(postId, { $inc: { comments: -1 } });
        return comment;
    } catch (err) {
        throw new InternalError()
    }
}

