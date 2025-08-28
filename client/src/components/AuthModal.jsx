// /src/components/AuthModal.jsx

import React, { useState } from 'react';

function AuthModal({ isOpen, onClose }) {
  const [isLoginView, setIsLoginView] = useState(true);

  // Jika modal tidak 'isOpen', jangan render apa-apa
  if (!isOpen) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('--- LOGIKA LOGIN API DISINI ---');
    onClose(); // Tutup modal setelah submit
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('--- LOGIKA REGISTER API DISINI ---');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {isLoginView ? (
          // --- Tampilan Login ---
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" required />
              
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" required />
              
              <button type="submit" className="modal-action-btn">Login</button>
            </form>
            <p className="modal-toggle-text">
              Belum punya akun?{' '}
              <span onClick={() => setIsLoginView(false)}>Daftar di sini</span>
            </p>
          </div>
        ) : (
          // --- Tampilan Register ---
          <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor="reg-name">Nama</label>
              <input type="text" id="reg-name" required />

              <label htmlFor="reg-email">Email</label>
              <input type="email" id="reg-email" required />

              <label htmlFor="reg-password">Password</label>
              <input type="password" id="reg-password" required />

              <button type="submit" className="modal-action-btn">Register</button>
            </form>
            <p className="modal-toggle-text">
              Sudah punya akun?{' '}
              <span onClick={() => setIsLoginView(true)}>Login di sini</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;