const Pusher = require("pusher");
const Notification = require('../../Models/Notification');
const { getCommentById, createComment, getComments, editComment, deleteComment } = require('./service.comment');
const Post = require('../Post/service.post');
const { ResourceNotFoundError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const comment = await getCommentById(commentId, postId);
    if (!comment)
        throw new ResourceNotFoundError();
    res.send(comment);
}

exports.getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await getComments(postId);
    res.send(comments);
}

exports.addComment = async (req, res) => {
    const pusher = new Pusher({
        appId: "1130167",
        key: "e3448519150a34e565aa",
        secret: "07c87b592fd113cc764f",
        cluster: "eu",
        useTLS: true
    });
    const userId = req.user.id;
    const { postId } = req.params;
    const { content } = req.body;
    const post = await Post.getPostById(postId);
    if (!post)
        throw new ResourceNotFoundError("Invalid post id");
    const comment = await createComment({ content, userId, postId });
    const notification = await new Notification({
        title: req.user.name + ' Commented on Your Post ' + post.title,
        description: content,
        author: post.author.id,
        category: {
            name: "Comment",
            model: comment.id,
        }
    });
    await notification.save();
    pusher.trigger("Notification", "commentCreated." + post.author.id, {
        comment,
        notification
    });
    res.status(201).send(comment);
}

exports.updateComment = async (req, res) => {
    const userId = req.user.id;
    const { content } = req.body;
    const { commentId, postId } = req.params;
    const comment = await editComment({ content, commentId, postId, userId });
    if (!comment)
        throw new ResourceNotFoundError();
    res.send(comment);
}

exports.removeComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req.user.id
    const comment = await deleteComment({ commentId, postId, userId });
    if (!comment)
        throw new ResourceNotFoundError();
    res.send(comment);
}