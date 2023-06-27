const express = require('express');
const {
    registerStorage,
    getStorage,
    updateStorageInfo
} = require('../controllers/storageController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, admin, registerStorage);
router.route('/info').put(protect, updateStorageInfo);
router.route('/:storageId').get(protect, getStorage);

module.exports = router;

