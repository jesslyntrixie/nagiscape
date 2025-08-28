// /server/models/Ambience.js
const mongoose = require('mongoose');

const ambienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creatorName: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  sourceUrl: { type: String, required: true },
  icon: { type: String, required: true } 
});

module.exports = mongoose.model('Ambience', ambienceSchema);