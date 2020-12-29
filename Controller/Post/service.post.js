const keywordExtractor = require("keyword-extractor");

const Post = require('../../Models/Post');
const View = require('../../Models/View');

const { InternalError } = require('../../Handlers/ErrorHandler/errorsBearer');

//get post by id
exports.getPostById = async (_id) => {
    const post = await Post.findOneAndUpdate({ _id }, { $inc: { views: 1 } }, { new: true })
        .and({ published: { $ne: false } })
        .populate('author');
    return post;
}
//get all posts
exports.getPosts = async (_id) => {
    const posts = await Post.find()
        .and({ published: { $ne: false } })
        .populate('author')
        .sort({ createdAt: -1 });
    return posts;
}

exports.createPost = async (data, authorId) => {
    const {
        title,
        content,
        cover,
        tags,
        published,
    } = data;

    const slug = generatePostSlug(title);
    const keywords = generatePostKeyword(content);

    const post = new Post({
        title,
        content,
        slug,
        cover,
        tags,
        keywords,
        published,
        author: authorId
    });
    try {
        //Saving Post
        await post.save();
        return post;
    } catch (err) {
        throw new InternalError(err.message);
    }
}

exports.createPostView = async (userId, post) => {
    try {
        const view = await View.findOne({ user: userId, post: post.id });
        if (!view && post.author.id !== userId)
            return await new View({ post: post.id, user: userId }).save();
    } catch (err) {
        throw new InternalError(err.message);
    }
}

exports.editPost = async (data) => {
    const { authorId, postId, ...rest } = data;
    try {
        const post = await Post.findOneAndUpdate({ _id: postId, author: authorId }, rest, { new: true });
        return post;
    } catch (err) {
        throw new InternalError(err.message)
    }
}

exports.deletePost = async (postId, authorId) => {
    try {
        const post = await Post.findOneAndDelete({ _id: postId, author: authorId });
        return post;
    } catch (err) {
        throw new InternalError(err.message)
    }
}

const generatePostSlug = (title) => {
    const randomString = Math.random().toString(36).substring(8);
    let slug = title.toLowerCase().replace(' ', '-');
    slug += '-' + randomString;
    return slug;
}
const generatePostKeyword = (content) => {
    const extractionResult = keywordExtractor.extract(
        content,
        {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true
        });
    return extractionResult.join(',');
}
