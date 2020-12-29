const keywordExtractor = require("keyword-extractor");

const Tag = require('../../Models/Tag');

const { InternalError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getTagById = async (id) => {
    const tag = await Tag.findById(id);
    return tag;
}

exports.getTags = async (_id) => {
    const tags = await Tag.find();
    return tags;
}

exports.createTag = async (data) => {
    const {
        name,
        description
    } = data;

    const tag = new Tag({
        name,
        description
    });
    try {
        //Saving Tag
        await tag.save();
        return tag;
    } catch (err) {
        throw new InternalError(err.message);
    }
}

exports.editTag = async (data) => {
    const { tagId, ...rest } = data;
    try {
        const tag = await Tag.findOneAndUpdate({ _id: tagId }, rest, { new: true });
        return tag;
    } catch (err) {
        throw new InternalError(err.message)
    }
}

exports.deleteTag = async (tagId) => {
    try {
        const tag = await Tag.findOneAndDelete({ _id: tagId });
        return tag;
    } catch (err) {
        throw new InternalError(err.message)
    }
}

