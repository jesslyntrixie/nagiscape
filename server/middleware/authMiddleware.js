// /server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    console.log('--- Satpam (Protect Middleware) Mulai Bekerja ---'); // <-- LOG A
    let token;

    // Cek ada token di header dan diawali dengan 'Bearer' atau ngga
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log('Header Authorization ditemukan.'); // <-- LOG B 
       try{
        // 1. Ambil token dari header tanpa kata 'Bearer'
        token = req.headers.authorization.split(' ')[1];
        console.log('Token yang diterima:', token); // <-- LOG C

        // 2. Verifikasi pakai kunci rahasia
        // JWT_SECRET itu kayak stampel. kita cek si token ini dibuat pakai stampel kita atau nggak.
        // decoded isinya kayak gini: 
        //   {
        //   "userId": "68ac370e75ec058c4b01fb70",
        //   "iat": 1678886400, // Issued At: Waktu kapan token ini dibuat
        //   "exp": 1678890000  // Expiration Time: Waktu kapan token ini kedaluwarsa
        // }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token berhasil di-decode:', decoded); // <-- LOG D


        // 3. Ambil data user dari database berdasarkan ID di token (kecuali password ya!!!), terus tempel di request supaya nanti mixController ga susah.
        req.user = await User.findById(decoded.userId).select('-password');
         console.log('User ditemukan di DB:', req.user.email); // <-- LOG E
        next();
        } catch (error) {
            console.error('!!! ERROR di dalam middleware:', error.message); // <-- LOG F (Penting!)
            res.status(401).json({message: 'Not authorized, token failed'});
       }
    }
    if (!token){
        console.log('Tidak ada token atau format header salah.'); // <-- LOG G
        res.status(401).json({message: 'Not authorized, no token'});
    }
};

module.exports = {protect};