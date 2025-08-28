// /src/components/SettingsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

function SettingsPage() {
  return (
    <div className="settings-page-container">
      <header className="settings-header">
        <Link to="/" className="back-link">&larr; Back to Player</Link>
        <h2>Settings</h2>
      </header>
      
      <div className="settings-content">
        {/* Change Password Section */}
        <div className="settings-section">
          <h3>Change Password</h3>
          <form>
            <label>Current password</label>
            <input type="password" />
            <label>New password</label>
            <input type="password" />
            <label>Confirm new password</label>
            <input type="password" />
            <div className="form-actions">
              <button type="submit" className="action-btn">Update Password</button>
              <a href="#" className="link-btn">Forgot password?</a>
            </div>
          </form>
        </div>

        {/* Danger Zone Section */}
        <div className="settings-section danger-zone">
          <h3>DANGER ZONE</h3>
          <p>Once you delete your account, there is no going back. Please be certain.</p>
          <button className="action-btn delete-btn">Delete Account</button>
        </div>

        {/* App Preferences Section */}
        <div className="settings-section">
          <h3>App Preferences</h3>
          <div className="preference-item">
            <span>Light Mode</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
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
  );
}

export default SettingsPage;