// /server/models/Mix.js

const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema({
    mixName: {
        type: String,
        required: true,
        trim: true
    },
    settings: {
        type: Object,
        required: true 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    music: { 
        track: { type: String }, 
        volume: { type: Number, default: 0.5 }
    }

}, {timestamps: true});

module.exports = mongoose.model('Mix', mixSchema);