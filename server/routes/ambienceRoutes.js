// /server/routes/ambienceRoutes.js
const express = require('express');
const router = express.Router();
const { getAmbienceSounds } = require('../controllers/ambienceController');

// Rute untuk mendapatkan semua suara ambience
router.route('/').get(getAmbienceSounds);

module.exports = router;