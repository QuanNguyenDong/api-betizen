const stripe = require('../utils/stripe');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');

// @desc 
// @route GET /api/subscription/prices
// @access Private
const getPrices = asyncHandler(async (req, res) => {
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY,
    })

    return res.json(prices);
})

const createSession = asyncHandler(async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

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
            success_url: "http://localhost:3000/articles",
            cancel_url: "http://localhost:3000/article-plans",
            customer: user.stripeCustomerId,
        },
        {
            apiKey: process.env.STRIPE_SECRET_KEY,
        }
    )

    return res.json(session);
})

module.exports = {
    getPrices,
    createSession,
}