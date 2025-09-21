// /server/api/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');
const mixRoutes = require('../routes/mixRoutes');
const ambienceRoutes = require('../routes/ambienceRoutes');
const trackRoutes = require('../routes/trackRoutes'); 
const userRoutes = require('../routes/userRoutes'); 
const { errorHandler } = require('../middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  }
};

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/mixes', mixRoutes);
app.use('/api/ambience', ambienceRoutes);
app.use('/api/track', trackRoutes); 
app.use('/api/users', userRoutes);

app.get('/api', (req, res) => {
    res.send('Server working!');
});

app.use(errorHandler);

module.exports = app;