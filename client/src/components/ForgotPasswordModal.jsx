// /src/components/ForgotPasswordModal.jsx
import React, { useState } from 'react';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Kita gunakan state error terpisah
  
  // 1. Tambahkan state isLoading
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please fill out the email field.');
      return;
    }

    // 2. Set loading menjadi true
    setIsLoading(true);

    try {
        const response = await fetch(`/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to send reset link.');
        }

        setMessage(data.message);
        setEmail('');
        
    } catch (err) {
        setError(err.message);
        
    } finally {
        // 3. Set loading kembali ke false setelah selesai
        setIsLoading(false);
        setTimeout(() => { setMessage('') }, 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {/* 4. Tambahkan overlay loading di sini */}
        {isLoading && (
          <div className="modal-loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <h2>Forgot Password</h2>
        <p>Enter your email address and we will send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="forgot-email">Email Address</label>
          <input 
            type="email" 
            id="forgot-email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* 5. Update tombol dengan status loading */}
          <button type="submit" className="modal-action-btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message  && <p className="form-message success">{message}</p>}
        {error && <p className="form-message error">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordModal;