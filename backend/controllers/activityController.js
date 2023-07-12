const asyncHandler = require('../middleware/asyncHandler');
const Activity = require("../models/activityModel");

// @desc Create a new activity
// @route POST /api/activity
// @access private
const registerActivity = asyncHandler(async (req, res) => {
    let user_from = req.user._id;
    let user_to = req.body.user_to;
    let containers = [];
    for (let i = 0; i < req.body.containerids.length; i++) {
        containers.push({ cid: req.body.containerids[i], returned: false });
    }
    const activity = await Activity.create({ user_from, user_to, containers });
    if (activity) {
        res.status(201).json({
            activity
        });
    } else {
        res.status(400);
        throw new Error('Error when generating an activity');
    }
});

// @desc Get activity information
// @route GET /api/activity/:id
// @access Private
const getActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.aid);

    if (activity) {
        res.json({ activity });
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }
});

// @desc Get all activities from the user
// @route GET /api/activity/from
// @access Private
const getActivitiesFrom = asyncHandler(async (req, res) => {
    const activities = await Activity.find({ user_from: req.user._id });

    if (activities) {
        res.json({ activities });
    } else {
        res.status(404);
        throw new Error('Activites not found');
    }
});

// @desc Get all activities to the user
// @route GET /api/activity/to
// @access Private
const getActivitiesTo = asyncHandler(async (req, res) => {
    const activities = await Activity.find({ user_to: req.user._id });

    if (activities) {
        res.json({ activities });
    } else {
        res.status(404);
        throw new Error('Activites not found');
    }
});

// @desc Update activity info
// @route PUT /api/activity/info
// @access Private
//TODO
const updateActivityInfo = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.body.aid);

    if (activity) {
        activity.containers = activity.containers;

        const updatedActivity = await activity.save();

        res.json(updatedActivity);
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }
});

// @desc activity container returned
// @route PUT /api/activity/container
// @access Private
//TODO
const updateActivityContainer = asyncHandler(async (req, res) => {
    let containers = req.body.containerids;
    let log = [];
    for (let i = 0; i < containers.length; i++) {
        let cid = containers[i]
        const activity = await Activity.findOne({ "containers.cid": cid }).sort({ createdAt: -1 });

        if (activity) {
            let k = 0;
            for (let j = 0; j < activity.containers.length; j++) {
                if (activity.containers[j].cid === cid) {
                    activity.containers[j].returned = true;
                }
                if (activity.containers[j].returned === true) {
                    k++;
                }
                if (k ===  activity.containers.length){
                    activity.finished = true;
                }
            }

            const updatedActivity = await activity.save();

            log.push(activity._id);
        } else {
            log.push('Activity not found');
        }

    }
    res.json({ log })
});

// @desc Get all activities
// @route GET /api/activitiy
// @access Admin
const getAllActivities = asyncHandler(async (req, res) => {
    const activities = await Activity.find({});
    res.json(activities);
})

// @desc Delete activitiy
// @route DELETE /api/activitiy/:id
// access Admin
const deleteActivity = asyncHandler(async (req, res) => {
    const activitiy = await Activity.findById(req.body._id);

    if (activitiy) {
        await activitiy.deleteOne({ _id: activitiy._id });
        res.json({ message: 'Activitiy removed' });
    } else {
        res.status(404);
        throw new Error('Activitiy not found');
    }
});

module.exports = {
    registerActivity,
    getActivity,
    getActivitiesFrom,
    getActivitiesTo,
    updateActivityInfo,
    updateActivityContainer,
    getAllActivities,
    deleteActivity
}