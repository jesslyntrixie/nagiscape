// /src/components/ForgotPasswordModal.jsx
import React, { useState } from 'react';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
        const response = await fetch(`/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        setMessage(data.message);
        console.log(data);
    } catch (error) {
        setMessage('An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Forgot Password</h2>
        <p>Enter your email address and we will send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="forgot-email">Email Address</label>
          <input 
            type="email" 
            id="forgot-email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="modal-action-btn">Send Reset Link</button>
        </form>
        {message && <p className="form-message success" style={{marginTop: '15px'}}>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordModal;