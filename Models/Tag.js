const Mongoose = require('mongoose');

const tagSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required'],
        unique: [true, 'Tag name must be unique'],
        min: [3, 'Required atleast 2 characters'],
        max: [255, 'Required atmost 255 characters'],
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Tag description is required'],
        min: [3, 'Required atleast 2 characters'],
        max: [1024, 'Required atmost 255 characters']
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

module.exports = Mongoose.model('Tag', tagSchema);