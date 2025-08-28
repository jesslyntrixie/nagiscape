// /server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const {registerUser, verifyUser, loginUser} = require('../controllers/authController');

router.post('/register', registerUser);
router.get('/verify-email', verifyUser);
router.post('/login', loginUser);

module.exports = router;