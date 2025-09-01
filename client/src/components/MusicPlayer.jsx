// src/components/MusicPlayer.jsx

import React from 'react';

function MusicPlayer({ tracks, currentTrack, isPlaying, onTrackSelect, musicVolume, onMusicVolumeChange }) {
  // Komponen ini tidak butuh state sendiri, karena semua dikontrol oleh parent.

  return (
    <div className="panel left-panel">
      <div className="panel-header">
        <h2 className="panel-title">Music Tracks</h2>
      </div>
      
     {/* 2. Tambahkan elemen slider volume utama */}
      <div className="volume-control">
        <i className="ri-volume-up-line volume-icon"></i>
        <input 
          type="range" 
          min="0" 
          max="100" 
         
          value={musicVolume} 
          onChange={(e) => onMusicVolumeChange(e.target.value)}
          className="slider"
        />
      </div>

      <div className="track-list">
        {tracks.map(track => {
          const isActive = currentTrack?._id === track._id;

          return (
            <div
              // Menambahkan class 'active' jika lagu sedang dipilih
              className={`track-item ${isActive ? 'active' : ''}`}
              key={track._id}
              // Memanggil fungsi dari parent saat item di-klik
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
                {/* Mengubah ikon berdasarkan status isPlaying dan lagu yang aktif */}
                {isActive && isPlaying ? (
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