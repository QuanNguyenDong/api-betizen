const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express()
const port = process.env.PORT || 3000

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json(
        {message: 'Hello World!'}
    );
})


app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
