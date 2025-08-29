// /models/Track.js
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  displayName: { type: String, required: true }, // Nama simpel yang Anda mau
  url: { type: String, required: true },        // Path ke file audio Anda
  sourceUrl: { type: String, required: true },   // CUKUP INI: Link ke halaman Pixabay
  icon: { type: String, required: true } 
});

module.exports = mongoose.model('Track', trackSchema);