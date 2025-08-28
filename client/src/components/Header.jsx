// /src/components/Header.jsx

import React, { useState } from 'react';
import MixesDropdown from './MixesDropdown';
import ProfileDropdown from './ProfileDropdown'; 

function Header({ user, onLoginClick, myMixes, onLoadMix, onDeleteMix }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // DITAMBAHKAN: State untuk mengontrol dropdown profil
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleMyMixesClick = () => {
    // Sederhanakan logika ini, karena user belum diimplementasikan
    // if (user) { ... }
    setDropdownOpen(!isDropdownOpen); 
  };
  
  // DITAMBAHKAN: Fungsi untuk handle logout
  const handleLogout = () => {
    console.log("Tombol Logout diklik!");
    // Nanti di sini Anda akan menambahkan logika logout sebenarnya
    // Contoh: setUser(null);
    setProfileOpen(false); // Tutup dropdown setelah logout
  };

  // Di dalam komponen Header

    const handleProfileIconClick = () => {
        if (user) {
            setProfileOpen(!isProfileOpen);
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
                
                {isDropdownOpen && (
                    <MixesDropdown 
                    mixes={myMixes}
                    onLoadMix={onLoadMix}
                    onDeleteMix={onDeleteMix}
                    />
                )}
            </div>

             <div className="profile-container">
                
                <div className="profile-icon" onClick={handleProfileIconClick}>
                    <i className="ri-user-line"></i>
                </div>
                
                {user && isProfileOpen && <ProfileDropdown user={user} onLogout={handleLogout} />}
 
            </div>
            
        </div>
    </header>
  );
}

export default Header;