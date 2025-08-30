// /server/controllers/trackController.js
const Track = require('../models/Track');

// @desc    Get all ambience sounds
// @route   GET /api/ambience
// @access  Public
const getTrackSounds = async (req, res) => {
  try {
    const sounds = await Track.find({});
    res.json(sounds);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTrackSounds };