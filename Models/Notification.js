const Mongoose = require('mongoose');

const notificationSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Notification Title is required'],
        min: [3, 'Required atleast 3 characters'],
        max: [1024, 'Required atmost 1024 characters']
    },
    description: {
        type: String,
        required: [true, 'Notification Description is required'],
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false,
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        required: [true, 'Notification User`s ID is required'],
        ref: 'User',
    },
    category: {
        name: {
            type: String,
            required: [true, 'Notification Category`s Name is required']
        },
        model: {
            type: Mongoose.Schema.Types.ObjectId,
            required: [true, 'Notification Category`s Model ID is required'],
            ref: function () {
                return this.category.name
            }
        }
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

module.exports = Mongoose.model('Notification', notificationSchema);