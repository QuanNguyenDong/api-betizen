const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {getPrices, createSession} = require('../controllers/subscriptionController')
const router = express.Router();

router.route('/prices').get(protect, getPrices);
router.route('/session').post(protect, createSession);

module.exports = router;