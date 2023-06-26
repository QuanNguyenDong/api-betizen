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
        type:{
            type: String,
            require: true,
            default: "1L"
        }
    },
    {
        timestamps: true,
    }
)


const Container = mongoose.model('Container', containerSchema);

module.exports = Container;
