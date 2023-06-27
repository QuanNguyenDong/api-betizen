const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        }
    },
    {
        timestamps: true,
    }
)

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
