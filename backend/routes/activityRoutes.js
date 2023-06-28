const express = require('express');
const {
    registerActivity,
    getActivity,
    getActivitiesFrom,
    getActivitiesTo,
    updateActivityInfo,
    getAllActivities,
    deleteActivity
} = require('../controllers/activityController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, registerActivity).get(protect, admin, getAllActivities);
router.route('/info').put(protect, updateActivityInfo);
router.route('/from').get(protect, getActivitiesFrom);
router.route('/to').get(protect, getActivitiesTo);
router.route('/:aid').get(protect, getActivity).delete(protect, admin, deleteActivity);;

module.exports = router;

