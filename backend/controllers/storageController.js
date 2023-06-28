const asyncHandler = require('../middleware/asyncHandler');
const Storage = require("../models/storageModel");
const Container = require("../models/containerModel");

// @desc Register a new storage
// @route POST /api/storage
// @access Admin
const registerStorage = asyncHandler(async (req, res) => {
    const storage = await Storage.create({});
    if (storage) {
        res.status(201).json({
            _id: storage._id
        });
    } else {
        res.status(400);
        throw new Error('Error when generating storage');
    }
});

// @desc Get storage information
// @route GET /api/storage/:storageId
// @access Private
const getStorage = asyncHandler(async (req, res) => {
    const storage = await Storage.findById(req.params.storageId);
    if (storage) {
        res.json({ storage });
    } else {
        res.status(404);
        throw new Error('storage not found');
    }
});

// @desc Update storage info
// @route PUT /api/storage/info
// @access Private
const updateStorageInfo = asyncHandler(async (req, res) => {
    let log = [];
    let storage = await Storage.findById(req.body.storageId);
    if (storage) {
        for (let i = 0; i < req.body.containerIds.length; i++) {
            let container = await Container.findById(req.body.containerIds[i]);

            if (container) {
                if (!storage.container_ids.includes(container._id)) {
                    storage.container_ids.push(container._id);

                    const updatedStorage = await storage.save();
                    log.push(updatedStorage)
                }
                else {
                    log.push("container " + container._id + " already connected to the storage")
                }
            } else {
                log.push('container ' + container._id + ' not found in system');
            }
        }
    } else{
        log.push("storage " + " does not exist in the system")
    }
    res.json({ log })
});

module.exports = {
    registerStorage,
    getStorage,
    updateStorageInfo
}