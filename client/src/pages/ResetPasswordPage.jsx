// /src/pages/ResetPasswordPage.jsx (Buat di folder baru 'pages')
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ResetPasswordPage() {
  const { token } = useParams(); // Ambil token dari URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    setMessage('');
    try {
        const response = await fetch(`${apiUrl}/api/auth/reset-password/${token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.message);
        setMessage(data.message);
    } catch (err) {
        setError(err.message);
    }
  };
  
  return (
    <div className="settings-page-container">
        <div className="settings-section">
            <h3>Reset Your Password</h3>
            {!message && (
                <form onSubmit={handleSubmit}>
                    <label>New Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <label>Confirm New Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    <button type="submit" className="action-btn" style={{marginTop: '15px'}}>Reset Password</button>
                </form>
            )}
            {error && <p className="form-message error">{error}</p>}
            {message && (
                <div>
                    <p className="form-message success">{message}</p>
                    <Link to="/" className="action-btn" style={{marginTop: '20px', textDecoration: 'none'}}>Back to App</Link>
                </div>
            )}
        </div>
    </div>
  );
}
export default ResetPasswordPage;