const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');
const generateQR = require('../utils/generateQR');
const stripe = require('../utils/stripe');

// @desc Auth user & get token
// @route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            qr_id: user.qr_id,
            points: user.points,
            pushNotification: user.pushNotification,
            containerReturned: user.containerReturned,
            accountType: user.accountType,
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (email === undefined || password === undefined) {
        res.status(400);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const customer = await stripe.customers.create(
        { email, },
        { apiKey: process.env.STRIPE_SECRET_KEY, }
    );

    const user = await User.create({
        name,
        email,
        phone,
        password,
        qr_id: await generateQR({
            name,
            email,
        }),
        stripeCustomerId: customer.id,
    });

    let uid = user._id;
    user.qr_id = await generateQR({uid});
    user.save();

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            qr_id: user.qr_id,
            points: user.points,
            pushNotification: user.pushNotification,
            containerReturned: user.containerReturned,
            accountType: user.accountType,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            qr_id: user.qr_id,
            points: user.points,
            pushNotification: user.pushNotification,
            containerReturned: user.containerReturned,
            accountType: user.accountType,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.points = req.body.points + user.points || user.points;
        if(req.body.pushNotification !== undefined){user.pushNotification = req.body.pushNotification;}
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            qr_id: user.qr_id,
            points: updatedUser.points,
            pushNotification: updatedUser.pushNotification,
            containerReturned: updatedUser.containerReturned,
            accountType: updatedUser.accountType,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

// @desc Delete user
// @route DELETE /api/users/:id
// access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin users');
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.isAdmin = Boolean(req.body.isAdmin);
        user.points = req.body.points + user.points || user.points;
        if(req.body.pushNotification !== undefined){user.pushNotification = req.body.pushNotification;}
        if (req.body.password) {
            user.password = req.body.password;
        }
  
        const updatedUser = await user.save();
  
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            qr_id: user.qr_id,
            points: updatedUser.points,
            pushNotification: updatedUser.pushNotification,
            containerReturned: updatedUser.containerReturned,
            accountType: updatedUser.accountType,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
}