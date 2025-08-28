require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const mixRoutes = require('./routes/mixRoutes');
const ambienceRoutes = require('./routes/ambienceRoutes'); 


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static('public'));


// "Kamera CCTV" untuk semua request yang masuk
app.use((req, res, next) => {
  console.log(`Request Diterima: ${req.method} ${req.originalUrl}`);
  next();
});
// -------------------------


app.use('/api/auth', authRoutes);
app.use('/api/mixes', mixRoutes);
app.use('/api/ambience', ambienceRoutes);

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));


const PORT = process.env.port || 5000;
app.get('/', (req, res) => {
    res.send('Server working!');
});

// Error Handling Middleware (HARUS DI BAWAH SEMUA RUTE)
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
