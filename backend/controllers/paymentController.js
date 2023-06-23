const stripe = require('../utils/stripe');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');


// @desc Get {setupIntent, ephemeralKey, customer}
// @route GET /api/payment-sheet
// @access Private
const getPayment = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);    

    if (!user) {
        res.status(404);
        throw new Error('User not found');       
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: user.stripeCustomerId},
        {apiVersion: '2022-11-15'}
    )

    const setupIntent = await stripe.setupIntents.create({
        customer: user.stripeCustomerId,
        payment_method_types: ['card'],
    })

    return res.json({
        setupIntent: setupIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: user.stripeCustomerId,
    });
})

module.exports = {getPayment};
