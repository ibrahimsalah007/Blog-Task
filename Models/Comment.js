const Mongoose = require('mongoose');

const commentSchema = new Mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment content is required'],
    },
    post: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'Comment Post ID is required'],
        ref:'Post'
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'Comment Author ID is required'],
        ref:'User'
    },
    likes: {
        type: Number,
        default: 0
    },
    reply: {
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

module.exports = Mongoose.model('Comment', commentSchema);