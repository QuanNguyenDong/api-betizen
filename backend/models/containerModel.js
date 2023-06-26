const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const containerSchema = mongoose.Schema(
    {
        current_user: {
            type: String,
            require: true,
            default: "betizen*"
        },
        past_users: {
            type: Array
        },
    },
    {
        timestamps: true,
    }
)


const Container = mongoose.model('Container', containerSchema);

module.exports = Container;
