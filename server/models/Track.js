// /models/Track.js
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Nama resmi untuk halaman kredit
  displayName: { type: String },                  // Nama untuk ditampilkan di UI (opsional)
  artistName: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  sourceUrl: { type: String, required: true }
});

module.exports = mongoose.model('Track', trackSchema);