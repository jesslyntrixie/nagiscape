// src/components/MusicPlayer.jsx

import React from 'react';

function MusicPlayer({ tracks, currentTrack, isPlaying, onTrackSelect, musicVolume, onMusicVolumeChange, disabled }) {

  return (
    <div className={`panel left-panel ${disabled ? 'disabled' : ''}`}>
      <div className="panel-header">
        <h2 className="panel-title">Music Tracks</h2>
      </div>
      
      <div className="volume-control">
        <i className="ri-volume-up-line volume-icon"></i>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={musicVolume} 
          onChange={(e) => onMusicVolumeChange(e.target.value)}
          className="slider"
          disabled={disabled}
        />
      </div>

      <div className="track-list">
        {tracks.map(track => {
          const isActive = currentTrack?._id === track._id;

          return (
              <div
                className={`track-item ${isActive ? 'active' : ''}`}
                key={track._id}
                onClick={() => onTrackSelect(track)}
              >
              <div className="track-thumbnail">
                <i className="ri-music-2-line"></i>
              </div>
              <div className="track-info">
                <div className="track-title">{track.displayName || track.title}</div>
                <div className="track-artist">{track.artistName}</div>
              </div>
              <div className="track-controls">
\                {isActive && isPlaying ? (
                  <i className="ri-pause-mini-fill"></i>
                ) : (
                  <i className="ri-play-mini-fill"></i>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MusicPlayer;