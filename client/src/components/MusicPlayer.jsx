// src/components/MusicPlayer.jsx

import React from 'react';

function MusicPlayer({ tracks, currentTrack, isPlaying, onTrackSelect }) {
  // Komponen ini tidak butuh state sendiri, karena semua dikontrol oleh parent.

  return (
    <div className="panel left-panel">
      <div className="panel-header">
        <h2 className="panel-title">Music Tracks</h2>
      </div>
      
      {/* Anda bisa menambahkan slider volume utama di sini jika mau */}

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