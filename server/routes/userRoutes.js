// /server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { changePassword, deleteAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
router.put('/change-password', protect, changePassword);
router.delete('/me', protect, deleteAccount);
module.exports = router;