import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Diperlukan untuk ProfileDropdown


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

function MixesDropdown({ mixes, onLoadMix, onDeleteMix }) {
  // Komponen kecil untuk setiap item di dalam dropdown
  function MixItem({ mix, onLoad, onDelete }) {
    return (
      <div className="mix-item-dropdown">
        <span className="mix-item-name">{mix.mixName}</span>
        <div className="mix-item-controls">
          <div className="mix-icon-btn load-icon" title="Load Mix" onClick={() => onLoad(mix.settings)}>
            <i className="ri-play-fill"></i>
          </div>
          <div className="mix-icon-btn delete-icon" title="Delete Mix" onClick={() => onDelete(mix._id)}>
            <i className="ri-delete-bin-line"></i>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mixes-dropdown-container">
      <div className="mixes-dropdown-header">
        <h4>My Mixes</h4>
      </div>
      <div className="mixes-dropdown-list">
        {mixes && mixes.length > 0 ? (
          mixes.map(mix => (
            <MixItem 
              key={mix._id} 
              mix={mix} 
              onLoad={onLoadMix} 
              onDelete={onDeleteMix}
            />
          ))
        ) : (
          <p className="empty-list-text">You have no saved mixes.</p>
        )}
      </div>
    </div>
  );
}



function Header({ user, onLoginClick, onLogout, myMixes, onLoadMix, onDeleteMix }) {
  const [isMixesOpen, setMixesOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleMyMixesClick = () => {
    if (user) {
      setMixesOpen(!isMixesOpen);
      if (isProfileOpen) setProfileOpen(false); 
    } else {
      onLoginClick();
    }
  };
  
  const handleProfileClick = () => {
    if (user) {
      setProfileOpen(!isProfileOpen);
      if (isMixesOpen) setMixesOpen(false);
    } else {
      onLoginClick();
    }
  };

  return (
    <header>
      <div className="logo">nagiscape<span>_</span></div>
      <div className="header-right">
        <div className="my-mixes-container">
          <button className="my-mixes-btn" onClick={handleMyMixesClick}>
            My Mixes
          </button>
          {isMixesOpen && (
            <MixesDropdown 
              mixes={myMixes}
              onLoadMix={onLoadMix}
              onDeleteMix={onDeleteMix}
            />
          )}
        </div>

        <div className="profile-container">
          <div className="profile-icon" onClick={handleProfileClick}>
            <i className="ri-user-line"></i>
          </div>
          {user && isProfileOpen && <ProfileDropdown user={user} onLogout={onLogout} />}
        </div>
      </div>
    </header>
  );
}

export default Header;

