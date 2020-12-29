const View = require('../../Models/View');
const {
    getPostById, createPost, getPosts, editPost, deletePost,
    getPostViewers, createPostView
} = require('./service.post');
const Comment = require('../Comment/service.comment');
const { ResourceNotFoundError } = require('../../Handlers/ErrorHandler/errorsBearer');
const { isAuthenticated } = require('../../Utils/isAuthenticated');

exports.getPost = async (req, res) => {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post)
        throw new ResourceNotFoundError();
    const comments = await Comment.getComments(post.id);
    // const authenticatedUser = await isAuthenticated(req.session.jwt);
    // if (authenticatedUser) {
    //     await createPostView(authenticatedUser.id, post);
    // }
    res.json({ post, comments });
}

exports.getPosts = async (req, res) => {
    const posts = await getPosts();
    res.send(posts);
}

exports.getPostViewers = async (req, res) => {
    const { id } = req.params;
    const postViewers = await getPostViewers(id);
    res.send(postViewers);
}

exports.addPost = async (req, res) => {
    const authorId = req.user.id;
    const post = await createPost(req.body, authorId);
    res.status(201).send(post);
}

exports.updatePost = async (req, res) => {
    const data = req.body;
    const postId = req.params.id;
    const authorId = req.user.id;
    const post = await editPost({ ...data, postId, authorId });
    if (!post)
        throw new ResourceNotFoundError();
    res.send(post);
}

exports.removePost = async (req, res) => {
    const authorId = req.user.id;
    const postId = req.params.id;
    const post = await deletePost(postId, authorId);
    if (!post)
        throw new ResourceNotFoundError();
    res.send(post);
}