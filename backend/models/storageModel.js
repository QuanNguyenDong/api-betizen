const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const storageSchema = mongoose.Schema(
    {
        container_ids: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Storage = mongoose.model('Storage', storageSchema);

module.exports = Storage;
