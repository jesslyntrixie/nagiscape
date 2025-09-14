// /src/components/CreditsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CreditsPage({ musicTracks = [], ambienceSounds = [] }) {
  const visualCredits = {
    icons: [
      {
        html: `<a href="https://www.flaticon.com/free-icons/moon" title="moon icons">Moon icons created by Freepik - Flaticon</a>`
      }
    ],
    video: [
      {
        name: 'Cozy Room Window at Night',
        sourceUrl: 'https://pixabay.com/videos/lofi-cat-night-window-rain-cute-246243/' 
      }
    ]
  };

  return (
    <div className="credits-page-container">
      <header className="settings-header">
        <Link to="/settings" className="back-link">
          <i className="ri-arrow-left-line"></i> Back to Settings
        </Link>
        <h2>Credits & Attribution</h2>
      </header>
      
      <div className="credits-grid">

        
        <div className="credits-column">
          <div className="credits-header">
            <i className="ri-music-2-line"></i>
            <h3>Music</h3>
          </div>
          <ul className="credits-list">
            {musicTracks.map(track => (
              <li className="credit-item" key={track._id}>
                <span className="credit-title">{track.displayName}</span>
                <a href={track.sourceUrl} className="credit-source" target="_blank" rel="noopener noreferrer">
                  Source <i className="ri-external-link-line"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="credits-column">
          <div className="credits-header">
            <i className="ri-volume-up-line"></i>
            <h3>Ambience Sounds</h3>
          </div>
          <ul className="credits-list">
            {ambienceSounds.map(sound => (
              <li className="credit-item" key={sound._id}>
                <span className="credit-title">{sound.name}</span>
                <a href={sound.sourceUrl} className="credit-source" target="_blank" rel="noopener noreferrer">
                  Source <i className="ri-external-link-line"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="credits-grid visual-credits">
        {/* Kolom untuk Ikon */}
        <div className="credits-column">
          <div className="credits-header">
            <i className="ri-pencil-ruler-2-line"></i>
            <h3>Icons & Design</h3>
          </div>
          <ul className="credits-list">
            {visualCredits.icons.map((icon, index) => (
              <li className="credit-item" key={`icon-${index}`}>
                <div 
                  className="credit-html" 
                  dangerouslySetInnerHTML={{ __html: icon.html }} 
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom untuk Video */}
        <div className="credits-column">
          <div className="credits-header">
            <i className="ri-film-line"></i>
            <h3>Background Video</h3>
          </div>
          <ul className="credits-list">
            {visualCredits.video.map((vid, index) => (
              <li className="credit-item" key={`video-${index}`}>
                <span className="credit-title">{vid.name}</span>
                <a href={vid.sourceUrl} className="credit-source" target="_blank" rel="noopener noreferrer">
                  Source<i className="ri-external-link-line"></i>
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