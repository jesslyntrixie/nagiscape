// /server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {timestamps: true});

// middleware yg berjalan sebelum user disimpan ke database
userSchema.pre('save', async function (next) {
    // jadi kerjaan disini itu kayak satpam sebelum data user di SAVE ke database.
    // kalau password ga modified, langsung next() atau SKIP langkah hashing
    // hashing itu kita buat garam, terus passwordnya dicampur sama garam itu.
    if (!this.isModified('password')){
        return next();
    }

    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);