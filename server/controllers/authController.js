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
        const message = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nagiscape Account Verification</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'MiSans', sans-serif, Arial; background-color: #2c2a3e;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 20px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #3a3852; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);">
                        
                        <tr>
                        <td align="center" style="padding: 30px 20px; border-bottom: 1px solid rgba(212, 195, 160, 0.2);">
                            <h1 style="color: #f7e6b9; font-size: 28px; margin: 0; font-family: 'Monospace', monospace;">
                            Welcome to <span>Nagiscape</span>
                            </h1>
                        </td>
                        </tr>

                        <tr>
                        <td style="padding: 40px 30px; color: #f5f0e9;">
                            <h2 style="font-size: 22px; color: #f5f0e9; margin-top: 0;">Just one more step...</h2>
                            <p style="font-size: 16px; line-height: 1.6; color: rgba(245, 240, 233, 0.8);">
                            Thank you for registering at Nagiscape. Please click the button below to verify your email address and activate your account.
                            </p>
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 12px 25px; font-size: 16px; font-weight: 500; color: #f7e6b9; background-color: rgba(212, 195, 160, 0.3); border: 1px solid rgba(212, 195, 160, 0.5); border-radius: 20px; text-decoration: none; cursor: pointer;">
                                    Verify My Account
                                </a>
                                </td>
                            </tr>
                            </table>

                            <p style="font-size: 14px; line-height: 1.6; color: rgba(245, 240, 233, 0.6);">
                            If you did not request this, please ignore this email. This verification link is valid for a limited time.
                            </p>
                        </td>
                        </tr>

                        <tr>
                        <td align="center" style="padding: 20px 30px; background-color: rgba(44, 42, 62, 0.8); border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                            <p style="margin: 0; font-size: 12px; color: rgba(212, 195, 160, 0.7);">
                            &copy; ${new Date().getFullYear()} Nagiscape. All rights reserved.
                            </p>
                        </td>
                        </tr>

                    </table>
                    </td>
                </tr>
                </table>
            </body>
            </html>
            `;

        // 8. Panggil fungsi sendEmail untuk mengirim email
        await sendEmail({
            to: user.email,
            subject: 'Verify Your Nagiscape Account',
            html: message
        });

        // 9. Kirim respons sukses ke frontend
        res.status(201).json({message: 'Please check your inbox and click the verification link to activate your account.'});
        
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
        // /server/controllers/authController.js

        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Successful</title>
                <style>
                /* Mengimpor font MiSans agar konsisten */
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'); /* Fallback font */
                
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    /* Warna background utama dari index.css */
                    background-color: #2c2a3e; 
                    /* Menggunakan font-family yang mirip, 'Roboto' sebagai fallback yang aman */
                    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                }
                
                /* Mengadopsi style .panel (glassmorphism) dari index.css */
                .container {
                    text-align: center;
                    background-color: rgba(50, 48, 70, 0.8); /* Warna lebih solid untuk keterbacaan */
                    backdrop-filter: blur(15px);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 40px 50px;
                    max-width: 450px;
                    color: #f5f0e9; /* Warna teks utama */
                }
                
                .icon {
                    font-size: 50px;
                    color: #f7e6b9; /* Warna aksen utama (emas) */
                    line-height: 1;
                }
                
                h1 {
                    font-size: 24px;
                    font-weight: 500;
                    color: #f7e6b9; /* Warna aksen utama (emas) */
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                
                p {
                    font-size: 16px;
                    color: #d4c3a0; /* Warna aksen sekunder */
                    line-height: 1.6;
                }

                a {
                    display: inline-block;
                    margin-top: 25px;
                    padding: 10px 25px;
                    border: 1px solid rgba(212, 195, 160, 0.5);
                    background-color: rgba(212, 195, 160, 0.3);
                    color: #f7e6b9;
                    font-size: 16px;
                    font-weight: 500;
                    border-radius: 20px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                a:hover {
                    background-color: rgba(212, 195, 160, 0.4);
                    box-shadow: 0 4px 15px rgba(212, 195, 160, 0.1);
                }
                </style>
            </head>
            <body>
                <div class="container">
                <div class="icon">✔</div>
                <h1>Account Verified!</h1>
                <p>Thank you for verifying your account. You can now close this page and log in to the application.</p>
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}">Back to App</a>
                </div>
            </body>
            </html>
            `);

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
        res.status(200).json({
            token,
            user: {
                _id: user._id,
                email: user.email
                // Tambahkan field lain jika ada dan dibutuhkan
            }
        });

    } catch (error){
        // 9. Tangkap jika ada error server
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}


// jwt itu kayak kalau udh login, ga perlu login lagi kalau mau akses api tertentu. ada masa berlaku, misal 1 jam: kalau udh lewat 1 jam maka session expired, harus login lagi.