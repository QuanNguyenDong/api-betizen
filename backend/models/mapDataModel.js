const mongoose = require('mongoose');

const mapDataSchema = mongoose.Schema(
    {
        coordinates: {
            type: { _id:false, latitude: { type: Number }, longitude: { type: Number } },
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        description:{
            type: String,
            require: true,
        },
        distance:{
            type: Number,
            require: true,
            default: 0,
        }
    },
)


const MapData = mongoose.model('MapData', mapDataSchema);

module.exports = MapData;
