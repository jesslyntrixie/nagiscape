// /src/components/AmbienceMixer.jsx

import React from 'react';

// Tambahkan 'disabled' sebagai prop
function AmbienceMixer({ sounds = [], volumes = {}, onVolumeChange, disabled }) {
    return(
        // Tambahkan class 'disabled' jika prop disabled bernilai true
        <div className={`panel right-panel ${disabled ? 'disabled' : ''}`}>
            <div className="panel-header">
                <h2 className="panel-title">Ambience Mixer</h2>
            </div>
            
            <div className="ambience-list">
                {sounds.map((sound) => (
                    <div className="ambience-item" key={sound._id}>
                        <div className="ambience-header">
                            <div className="ambience-icon"><i className={sound.icon}></i></div>
                            <div className="ambience-name">{sound.name}</div>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={volumes[sound._id] || 0} 
                            onChange={(e) => onVolumeChange(sound._id, e.target.value)}
                            className="slider ambience-slider"
                            // Tambahkan properti disabled
                            disabled={disabled}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AmbienceMixer;