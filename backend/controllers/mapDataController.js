const asyncHandler = require('../middleware/asyncHandler');
const MapData = require("../models/mapDataModel");

// @desc Add a new map data
// @route POST /api/map-data
// @access Admin
const registerMapData = asyncHandler(async (req, res) => {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let coordinates = {latitude, longitude};
    let title = req.body.title;
    let description = req.body.description;
    const mapData = await MapData.create({coordinates, title, description});
    if (mapData) {
        res.status(201).json(mapData);
    } else {
        res.status(400);
        throw new Error('Error when generating map data');
    }
});

// @desc Get all map data
// @route GET /api/map-data
// @access Private
const getMapData = asyncHandler(async (req, res) => {
    const mapData = await MapData.find({});
    res.json(mapData);
});

// @desc Update map data
// @route PUT /api/map-data
// @access Admin
const updateMapData = asyncHandler(async (req, res) => {
    const mapData = await MapData.findById(req.body.mapId);
    if (mapData) {
        mapData.coordinates = req.body.coordinates || mapData.coordinates;
        mapData.title = req.body.title || mapData.title;
        mapData.description = req.body.description || mapData.description;

        const updatedMapData = await mapData.save();

        res.json(updatedMapData);
    } else {
        res.status(404);
        throw new Error('MapData not found');
    }    
});

// @desc Delete map data
// @route DELETE /api/map-data
// @access Admin
const deleteMapData = asyncHandler(async (req, res) => {
    const mapData = await MapData.findById(req.body._id);

    if (mapData) {
        await mapData.deleteOne({ _id: mapData._id });
        res.json({ message: 'MapData removed' });
    } else {
        res.status(404);
        throw new Error('MapData not found');
    }
});

module.exports = {
    registerMapData,
    getMapData,
    updateMapData,
    deleteMapData,
}