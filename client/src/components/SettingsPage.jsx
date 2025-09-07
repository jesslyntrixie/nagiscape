// /src/components/SettingsPage.jsx
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import ForgotPasswordModal from './ForgotPasswordModal';


function SettingsPage( {onLogout} ) {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isForgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if ( confirmPassword !== newPassword) {
      setError("New passwords do not match!")
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
    }

    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch(`${apiUrl}/api/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();

      if (response.ok){
        setSuccessMessage(data.message || "Password updated successfully!")
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(()=>setSuccessMessage(''), 4000);
      } else {
        throw new Error(data.message || 'Failed to update password');
      }
    } catch (error) {
      setError(error.message);
      console.error("Error changing password: ", error);
    }

  };
  
  const handleDelete = async () => {
    if (!window.confirm("Are you absolutely sure? This action cannot be undone.")) {
      return; 
    }

    try {
      const token = localStorage.getItem('authToken'); 

      if (!token) {
        setError("You must be logged in to perform this action.");
        return;
      }

      const response = await fetch(`/api/users/me`, { 
        method: 'DELETE', 
        headers : {
          'Authorization': `Bearer ${token}` 
        }
      });
      if (response.ok) {
        alert("Account deleted successfully.");  
        onLogout(); 
        navigate('/'); 
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete account.');
      }
    } catch (err) {
      setError(err.message);
      console.error("Error deleting account:", err);
    }
  };

  return (
    <>
      <div className="settings-page-container">
        <header className="settings-header">
          <Link to="/" className="back-link">&larr; Back to Player</Link>
          <h2>Settings</h2>
        </header>
        
        <div className="settings-content">
          {/* Change Password Section */}
          <div className="settings-section">
            <h3>Change Password</h3>
            <form onSubmit={handleSubmit}>
              <label>Current password</label>
              <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required/>
              <label>New password</label>
              <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required/>
              <label>Confirm new password</label>
              <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value)}}
              required
              />
              <div className="form-actions">
                <button type="submit" className="action-btn">Update Password</button>
                <button onClick= {() => setForgotModalOpen(true)}className="link-btn">Forgot password?</button>
              </div>
              {error && <p className="form-message error">{error}</p>}
              {successMessage && <p className="form-message success">{successMessage}</p>}
            </form>

          </div>

          {/* Danger Zone Section */}
          <div className="settings-section danger-zone">
            <h3>DANGER ZONE</h3>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            <button className="action-btn delete-btn" onClick={handleDelete}>Delete Account</button>
          </div>

          {/* App Preferences Section */}
          {/* <div className="settings-section">
            <h3>App Preferences</h3>
            <div className="preference-item">
              <span>Light Mode</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div> */}
          
          {/* About Section */}
          <div className="settings-section">
          <h3>About & Credits</h3>
            <p>Nagiscape v1.0.0 - A relaxing soundscape experience.</p>
            <div className="form-actions">
              {/* Gunakan Link dari React Router */}
              <Link to="/credits" className="action-btn">
                View Credits & Attributions
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={() => setForgotModalOpen(false)} />
    </>
  );
}

export default SettingsPage;