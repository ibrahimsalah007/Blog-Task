const Tag = require('../../Models/Tag');
const { getTagById, createTag, getTags, editTag, deleteTag } = require('./service.tag');
const { ResourceNotFoundError } = require('../../Handlers/ErrorHandler/errorsBearer');

exports.getTag = async (req, res) => {
    const { id } = req.params;
    const tag = await getTagById(id);
    if (!tag)
        throw new ResourceNotFoundError();
    res.send(tag);
}

exports.getTags = async (req, res) => {
    const tags = await getTags();
    res.send(tags);
}

exports.addTag = async (req, res) => {
    try {
        const tag = await createTag(req.body);
        res.status(201).send(tag);
    } catch (err) {
        console.log(err.message);
    }
}

exports.updateTag = async (req, res) => {
    const data = req.body;
    const tagId = req.params.id;
    const tag = await editTag({ ...data, tagId });
    if (!tag)
        throw new ResourceNotFoundError();
    res.send(tag);
}

exports.removeTag = async (req, res) => {
    const tagId = req.params.id;
    const tag = await deleteTag(tagId);
    if (!tag)
        throw new ResourceNotFoundError();
    res.send(tag);
}