const stripe = require('../utils/stripe');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');

// @desc Get prices plan (Basic and Standard)
// @route GET /api/subscriptions/prices
// @access Private
const getPrices = asyncHandler(async (req, res) => {
    const prices = await stripe.prices.list({
        active: true,
    })

    const products = await Promise.all(prices.data.map(async (price) => {
        const prc = await stripe.prices.retrieve(price["default_price"])
        return {
            ...price,
            unit_amount: prc["unit_amount"],
        }
    }))

    return res.json(products);
})

// @desc Create Session
// @route POST /api/session
// @access Private
const createSession = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const session = await stripe.checkout.sessions.create(
            {
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: req.body.priceId,
                        quantity: 1,
                    },
                ],
                // success_url: "http://localhost:3000/",
                // cancel_url: "http://localhost:3000/",
                customer: user.stripeCustomerId,
            },
            {
                apiKey: process.env.STRIPE_SECRET_KEY,
            }
        )
    
        return res.json(session);
    } else {
        res.status(404);
        throw new Error('User not found');       
    }
})

module.exports = {
    getPrices,
    createSession,
}