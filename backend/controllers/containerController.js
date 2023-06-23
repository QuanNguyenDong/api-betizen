const asyncHandler = require('../middleware/asyncHandler');
const Container = require("../models/containerModel");

// @desc Register a new container
// @route POST /api/containers
// @access Admin
const registerContainer = asyncHandler(async (req, res) => {
    const container = await Container.create({});
    if (container) {
        res.status(201).json({
            _id: container._id,
        });
    } else {
        res.status(400);
        throw new Error('Error when generating a container');
    }
});

// @desc Get container information
// @route GET /api/containers/info
// @access Private/Admin
const getContainer = asyncHandler(async (req, res) => {
    const container = await Container.findById(req.body._id);

    if (container) {
        res.json({
            _id: container._id,
            current_user: container.current_user,
            past_users: container.past_users,

        });
    } else {
        res.status(404);
        throw new Error('Container not found');
    }
});

// @desc Get all containers currently connected to the user
// @route GET /api/containers/:uid
// @access Private/Admin
const getContainers = asyncHandler(async (req, res) => {
    const containers = await Container.find({ current_user: req.user._id });

    if (containers) {
        res.json({ containers });
    } else {
        res.status(404);
        throw new Error('Containers not found');
    }
});

// @desc Update container info
// @route PUT /api/containers/info
// @access Private
const updateContainerInfo = asyncHandler(async (req, res) => {
    for (let i = 0; i < req.body.containerIds; i++) {
        let container = await Container.findById(req.body.containerIds[i]);

        if (container) {
            if (container.current_user != req.body.userId) {
                container.past_users = container.past_users + container.current_user
                container.current_user = req.body.userId;

                const updatedContainer = await container.save();

                res.json({ status: "updated" });
            }
        } else {
            res.status(404);
            throw new Error('Container not found');
        }
    }
});

// @desc Get all containers
// @route GET /api/containers
// @access Admin
const getAllContainers = asyncHandler(async (req, res) => {
    const containers = await Container.find({});
    res.json(containers);
})

// @desc Delete container
// @route DELETE /api/containers/:id
// access Admin
const deleteContainer = asyncHandler(async (req, res) => {
    const container = await Container.findById(req.body._id);

    if (container) {
        await container.deleteOne({ _id: container._id });
        res.json({ message: 'Container removed' });
    } else {
        res.status(404);
        throw new Error('Container not found');
    }
});

module.exports = {
    registerContainer,
    getContainer,
    getContainers,
    updateContainerInfo,
    getAllContainers,
    deleteContainer,
}