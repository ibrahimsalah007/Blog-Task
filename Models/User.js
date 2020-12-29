const Mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');


const userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User First name required'],
        min: [3, 'Required atleast 3 characters'],
        max: [255, 'Required atmost 255 characters']
    },
    lastName: {
        type: String,
        required: [true, 'User Last name required'],
        min: [3, 'Required atleast 3 characters'],
        max: [255, 'Required atmost 255 characters']
    },
    fullName: {
        type:String,
        required: true,
        default: function () {
            return this.firstName + ' ' + this.lastName
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[+#*\(\)\[\]]*([0-9][ ext+-pw#*\(\)\[\]]*){6,45}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid Email!`
        },
        required: [true, 'User Email required']
    },
    password: {
        type: String,
        required: [true, 'User password required'],
        trim: true,
        min: [6, 'Required atleast 6 characters'],
        max: [60, 'Required atmost 255 characters']
    },
    location: {
        type: String,
        required: [true, 'User Region is required'],
        trim: true,
        min: [6, 'Required atleast 3 characters'],
        max: [60, 'Required atmost 255 characters']
    },
    avatar: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        min: [6, 'Required atleast 3 characters'],
        max: [60, 'Required atmost 255 characters'],
        trim: true,
    },
    skills: {
        type: Array,
        required: true,
        default: []
    },
    tags: {
        type: [Mongoose.Schema.Types.ObjectId],
        required: [true, 'Required atleast one tag to follow.'],
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // },
    // updatedAt: {
    //     type: Date
    // },

},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        },
        timestamps: true
    })

// set Document instant Date on update.
// userSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// Has user password.
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();

    Bcrypt.hash(user.password, 10, (err, hash) => {
        console.log(hash)
        if (err) {
            return next(err.message);
        }
        user.password = hash;
        next();
    });
});

module.exports = Mongoose.model('User', userSchema);