// /server/utils/sendEmail.js

const nodemailer = require('nodemailer');

const sendEmail = async(options) => {
    // 1. Buat transporter (layanan email yg akan dipakai)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 2. Definisikan opsi email (penerima, subjek, isi)
    const mailOptions = {
        from: `Nagiscape <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    // 3. Kirim emailnya
    // memang ini await ya. tapi nanti error handlingnya di boss nya (sendEmail.js ini kayak workernya. manajernya itu si registerUser. kalau error, nanti si sendEmail.js akan kirim errornya ke bosnya terus nanti bakal di catch disana :3)
    
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;