// /server/controllers/ambienceController.js
const Ambience = require('../models/Ambience');

// @desc    Get all ambience sounds
// @route   GET /api/ambience
// @access  Public
const getAmbienceSounds = async (req, res) => {
  try {
    const sounds = await Ambience.find({});
    res.json(sounds);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAmbienceSounds };