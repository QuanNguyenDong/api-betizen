const express = require('express');
const {getPayment} = require('../controllers/paymentController')
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getPayment);

module.exports = router;