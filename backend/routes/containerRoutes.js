const express = require('express');
const {
    registerContainer,
    getContainer,
    getContainers,
    updateContainerInfo,
    getAllContainers,
    deleteContainer,
} = require('../controllers/containerController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, registerContainer).get(protect, admin, getAllContainers);
router.route('/info').get(protect, getContainer).put(protect, updateContainerInfo);
router.route('/:uid').get(protect, getContainers);
router.route('/:id').delete(protect, admin, deleteContainer);

module.exports = router;

