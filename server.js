const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

const PORT = process.env.PORT || 8080;

// Routes
app.use('/api/v1/auth', authRoute);

// Base route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
