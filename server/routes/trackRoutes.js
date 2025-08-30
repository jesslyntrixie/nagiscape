// /server/routes/trackRoutes.js
const express = require('express');
const router = express.Router();
const { getTrackSounds } = require('../controllers/trackController');

// Rute untuk mendapatkan semua suara ambience
router.route('/').get(getTrackSounds);

module.exports = router;