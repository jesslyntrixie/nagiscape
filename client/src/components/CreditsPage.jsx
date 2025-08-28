// /src/components/CreditsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CreditsPage({ musicTracks = [], ambienceSounds = [] }) {
  return (
    <div className="credits-page-container">
      <header className="settings-header">
        <Link to="/settings" className="back-link">
          <i className="ri-arrow-left-line"></i> Back to Settings
        </Link>
        <h2>Credits & Attribution</h2>
      </header>
      
      {/* Gunakan grid untuk layout utama */}
      <div className="credits-grid">

        {/* Kolom untuk Musik */}
        <div className="credits-column">
          <div className="credits-header">
            <i className="ri-music-2-line"></i>
            <h3>Music</h3>
          </div>
          <ul className="credits-list">
            {musicTracks.map(track => (
              <li className="credit-item" key={track._id}>
                <span className="credit-title">{track.title}</span>
                <span className="credit-artist">by {track.artistName}</span>
                <a href={track.sourceUrl} className="credit-source" target="_blank" rel="noopener noreferrer">
                  Source <i className="ri-external-link-line"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom untuk Ambience */}
        <div className="credits-column">
          <div className="credits-header">
            <i className="ri-volume-up-line"></i>
            <h3>Ambience Sounds</h3>
          </div>
          <ul className="credits-list">
            {ambienceSounds.map(sound => (
              <li className="credit-item" key={sound._id}>
                <span className="credit-title">{sound.name}</span>
                <span className="credit-artist">by {sound.creatorName}</span>
                <a href={sound.sourceUrl} className="credit-source" target="_blank" rel="noopener noreferrer">
                  Source <i className="ri-external-link-line"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default CreditsPage;