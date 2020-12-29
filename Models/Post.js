const Mongoose = require('mongoose');

const postSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post Title is required'],
        min: [3, 'Required atleast 3 characters'],
        max: [1024, 'Required atmost 1024 characters']
    },
    content: {
        type: String,
        required: [true, 'Post Content is required'],
        min: [3, 'Required atleast 3 characters'],
        max: [40000, 'Required atmost 40000 characters']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'Slug is required'],
        min: [3, 'Required atleast 3 characters'],
        max: [1024, 'Required atmost 1024 characters']
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    cover: {
        type: String,
    },
    tags: {
        type: [String],
        required: true,
        min: [3, 'Required atleast 1 tag'],
    },
    keywords: {
        type: String,
        required: true,
        min: [1, 'Required atleast 1 keyword'],
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        required: true,
        default: false
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

module.exports = Mongoose.model('Post', postSchema);