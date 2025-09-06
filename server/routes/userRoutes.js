// /server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
router.put('/change-password', protect, changePassword);
module.exports = router;