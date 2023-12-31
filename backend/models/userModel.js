const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        }, 
        isAdmin: {
            type: Boolean,
            require: true,
            default: false,
        },
        qr_id: {
            type: String,
            require: true,
        },
        points: {
            type: Number,
            require: true,
            default: 0,
        },
        stripeCustomerId: {
            type: String,
            // require: true,
        },
        pushNotification: {
            type: Boolean,
            require: true,
            default: true,
        },
        accountType: {
            type: String,
            require: true,
            default: "Customer",
        },
        containerReturned: {
            type: Number,
            require: true,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model('User', userSchema);

module.exports = User;
