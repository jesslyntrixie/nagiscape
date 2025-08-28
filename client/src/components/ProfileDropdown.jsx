// /src/components/ProfileDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileDropdown({ user, onLogout }) {
  return (
    <div className="profile-dropdown-container">
      <div className="dropdown-item user-email">{user.email}</div>
      <Link to="/settings" className="dropdown-item">
        Settings
      </Link>
      <div className="dropdown-item logout-item" onClick={onLogout}>
        Logout
      </div>
    </div>
  );
}

export default ProfileDropdown;