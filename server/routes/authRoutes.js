// /server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const {registerUser, verifyUser, loginUser} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');
const {getUserProfile} = require('../controllers/authController');



router.post('/register', registerUser);
router.get('/verify-email', verifyUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;