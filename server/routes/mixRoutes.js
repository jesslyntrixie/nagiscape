// /server/routes/mixRoutes.js
const express = require('express');
const router = express.Router();
const {createMix, getMyMixes, deleteMix} = require('../controllers/mixController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getMyMixes).post(protect, createMix);

router.route('/:id').delete(protect, deleteMix);

module.exports = router;