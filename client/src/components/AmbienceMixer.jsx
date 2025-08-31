// /src/components/AmbienceMixer.jsx

import React, { useState } from 'react';

// 1. Komponen sekarang menerima props `sounds`.
//    Kita beri nilai default array kosong `[]` agar tidak error jika props tidak dikirim.
function AmbienceMixer({ sounds = [] }) {

    // (Opsional, tapi sangat direkomendasikan) State untuk mengelola volume setiap suara
    const [volumes, setVolumes] = useState(() => {
        const initialVolumes = {};
        sounds.forEach(sound => {
            initialVolumes[sound.id] = sound.initialVolume;
        });
        return initialVolumes;
    });

    const handleVolumeChange = (soundId, newVolume) => {
        setVolumes(prevVolumes => ({
            ...prevVolumes,
            [soundId]: parseInt(newVolume, 10) // pastikan nilainya integer
        }));
    };

    return(
        <div className="panel right-panel">
            <div className="panel-header">
                <h2 className="panel-title">Ambience Mixer</h2>
            </div>
            
            <div className="ambience-list">
                {/* 2. Gunakan .map() untuk iterasi setiap item di dalam array 'sounds' */}
                {sounds.map((sound) => (
                    // 3. 'key' adalah properti wajib dan harus unik untuk setiap item dalam list
                    <div className="ambience-item" key={sound._id}>
                        <div className="ambience-header">
                            {/* Gunakan data dinamis dari objek 'sound' */}
                            <div className="ambience-icon"><i className={sound.iconClass}></i></div>
                            <div className="ambience-name">{sound.name}</div>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            // Gunakan state untuk value dan onChange agar slider interaktif
                            // value={volumes[sound.id]} 
                            defaultValue="70"
                            onChange={(e) => handleVolumeChange(sound.id, e.target.value)}
                            className="slider ambience-slider"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AmbienceMixer;