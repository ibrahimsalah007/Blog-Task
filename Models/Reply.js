const Mongoose = require('mongoose');

const replySchema = new Mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Reply content is required'],
    },
    comment: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'Reply Comment ID is required'],
        ref: 'Comment'
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'Reply Author ID is required'],
        ref: 'User'
    },
    likes: {
        type: Number,
        default: 0
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        },
        timestamps: true
    });

module.exports = Mongoose.model('Reply', replySchema);