const Mongoose = require('mongoose');

const viewSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'View User ID is required'],
        ref: 'User'
    },
    post: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'View Post ID is required'],
        ref: 'Post'
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

module.exports = Mongoose.model('View', viewSchema);