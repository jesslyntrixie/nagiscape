// /server/controllers/authController.js
// file ini untuk manajer autentikasi: ngurusin daftar, login, verif.
// User: blueprint data user
// jwt: pembuat ID card digital (pake wkt login)
// bcryptjs: pengacak password
// crypto: pembuat kode ajak punya Node.js untuk token verif





const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc Register a new user
exports.registerUser = async (req, res) => {
    // 1. Ambil email & password dari data yang dikirim frontend (req.body)
    const {email, password} = req.body;
    try{
        // 2. Cek ke database apakah email ini sudah pernah terdaftar
        const userExists = await User.findOne({email});
        if (userExists){
            // 3. Jika sudah ada, kirim pesan error dan hentikan proses
            return res.status(400).json({message: 'Email already exists'});
        }
        
        // 4. Buat token verifikasi yang unik dan acak
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // 5. Buat dokumen pengguna baru di memori (belum disimpan)
        // Password akan otomatis di-hash oleh middleware 'pre-save' di User.js
        const user = new User({
            email,
            password,
            verificationToken
        });

        // 6. Simpan pengguna baru tersebut ke database
        await user.save();

        // 7. Siapkan link dan pesan untuk email verifikasi
        const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;
        const message = `<h1>Account Verification</h1>
            <p>Thank you for registering. Please click the link below to verify your account:</p>
            <a href="${verificationUrl}" clicktracking=off>${verificationUrl}</a>`; // (Isi email dalam format HTML)

        // 8. Panggil fungsi sendEmail untuk mengirim email
        await sendEmail({
            to: user.email,
            subject: 'Verify Your Nagiscape Account',
            html: message
        });

        // 9. Kirim respons sukses ke frontend
        res.status(201).json({message: 'Registration succesful, please check your email to verify your account.'});
        
    } catch (error){
        // 10. Jika ada kesalahan di langkah mana pun, tangkap errornya
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// @desc Verify user email
exports.verifyUser = async (req, res) => {
    try{
        // 1. Cari pengguna di database yang punya verificationToken
        //    yang cocok dengan token dari URL (req.query.token)
        const user = await User.findOne({
            verificationToken: req.query.token
        });

        // 2. Jika tidak ada pengguna dengan token itu, berarti link tidak valid
        if (!user) {
            return res.status(400).send('<h1>Invalid or expired verification link.</h1>');
        }

        // 3. Jika ditemukan, update statusnya
        user.isVerified = true;
        user.verificationToken = undefined; // Hapus token agar tidak bisa dipakai lagi
        
        // 4. Simpan perubahan ini ke database
        await user.save();
        
        // 5. Kirim pesan sukses ke browser pengguna
        res.status(200).send('<h1>Account verified successfully! You can now log in.</h1>');

    } catch (error){
        // 6. Tangkap jika ada error server
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

// @desc Authenticate user & get token
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Cari pengguna berdasarkan email
        const user = await User.findOne({email});
        // 2. Jika user tidak ada, langsung kirim pesan error
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // 3. Bandingkan password yang diketik (password) dengan hash di database (user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        // 4. Jika tidak cocok, kirim pesan error
        if (!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // 5. Periksa apakah akun sudah diverifikasi
        if (!user.isVerified){
            return res.status(401).json({message: 'Please verify your email to log in.'});
        }

        // 6. Jika semua pemeriksaan lolos, siapkan data untuk "kartu akses" (payload)
        const payload = {userId: user.id}; // Cukup simpan ID pengguna
        
        // 7. Buat token JWT
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // Kunci rahasia dari .env
            {expiresIn: '1h'} // Token akan kedaluwarsa dalam 1 jam
        );

        // 8. Kirim token tersebut sebagai respons sukses
        res.status(200).json({token});

    } catch (error){
        // 9. Tangkap jika ada error server
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}


// jwt itu kayak kalau udh login, ga perlu login lagi kalau mau akses api tertentu. ada masa berlaku, misal 1 jam: kalau udh lewat 1 jam maka session expired, harus login lagi.