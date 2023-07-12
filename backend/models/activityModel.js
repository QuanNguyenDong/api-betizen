const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const activitySchema = mongoose.Schema(
    {
        user_from: {
            type: String,
            required: true,
        },
        user_to: {
            type: String,
            required: true,
        },
        containers: {
            type: [{ _id:false, cid: { type: String }, returned: { type: Boolean } }],
            required: true,
        },
        finished:{
            type:Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
