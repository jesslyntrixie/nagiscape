import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import AmbienceMixer from './components/AmbienceMixer.jsx';
import PlayerBar from './components/PlayerBar.jsx';
import AuthModal from './components/AuthModal.jsx';
import SaveMixModal from './components/SaveMixModal.jsx';
import SettingsPage from './components/SettingsPage';
import CreditsPage from './components/CreditsPage.jsx';
const apiUrl = import.meta.env.VITE_API_BASE_URL;





function MainLayout({ musicTracks, ambienceSounds, myMixes, setMyMixes }) {

  // States --------------------------------------------------------------
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSaveMixModalOpen, setSaveMixModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(70);
  const [ambienceVolumes, setAmbienceVolumes] = useState({});
  // ---------------------------------------------------------------------


  const musicAudioRef = useRef(new Audio());
  const ambienceAudioRefs = useRef({});


  // functions -----------------------------------------------------------
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleTrackSelect = (track) => {
    const fullTrackUrl = `${apiUrl}${track.url}`;
    if (currentTrack && currentTrack._id === track._id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      if (musicAudioRef.current.src !== fullTrackUrl) {
        musicAudioRef.current.src = fullTrackUrl;
      }
      setIsPlaying(true);
    }
  };

  const handleAmbienceVolumeChange = (soundId, volume) => {
    setAmbienceVolumes(prev => ({ ...prev, [soundId]: parseInt(volume) }));
    if (!ambienceAudioRefs.current[soundId]) {
      const soundData = ambienceSounds.find(s => s._id === soundId);
      if (soundData) {
        const audio = new Audio(soundData.url);
        audio.loop = true;
        ambienceAudioRefs.current[soundId] = audio;
      }
    }
  };
  // ----------------------------------------------------------------------------


  // useeffects/ listeners ------------------------------------------------------

  useEffect(() => {
    if (isPlaying && currentTrack) {
      musicAudioRef.current.play();
    } else {
      musicAudioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    musicAudioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    Object.keys(ambienceAudioRefs.current).forEach(soundId => {
      const audio = ambienceAudioRefs.current[soundId];
      const volume = ambienceVolumes[soundId] || 0;
      audio.muted = isMuted;
      audio.volume = volume / 100;
      if (volume > 0 && audio.paused) {
        audio.play();
      } else if (volume === 0) {
        audio.pause();
      }
    });
  }, [isMuted, ambienceVolumes]);

  // -------------------------------------------------------------------------


  const handleSaveMixClick = () => { /* ... (logika ini sudah benar) ... */ };
  const saveMixToServer = (mixName) => { /* ... (logika ini sudah benar) ... */ };
  const loadMixSettings = (settings) => { /* ... (logika ini sudah benar) ... */ };
  const deleteMix = (mixId) => { /* ... (logika ini sudah benar) ... */ };

  return (
    <div className="container">
      <Header
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        myMixes={myMixes}
        onLoadMix={loadMixSettings}
        onDeleteMix={deleteMix}
      />
      <main className="main-content">
        <MusicPlayer 
          tracks={musicTracks} 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTrackSelect={handleTrackSelect}
        />
         <AmbienceMixer 
          sounds={ambienceSounds} 
          volumes={ambienceVolumes}
          onVolumeChange={handleAmbienceVolumeChange}
        />
      </main>
      <PlayerBar 
        isMuted={isMuted}
        onMuteClick={toggleMute}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onSaveMixClick={handleSaveMixClick} 
      />
      {/* ... (Modal lainnya) ... */}
    </div>
  );
}

function App() {
  const [musicTracks, setMusicTracks] = useState([]);
  const [ambienceSounds, setAmbienceSounds] = useState([]);
  const [myMixes, setMyMixes] = useState([ 
      { _id: '1', mixName: 'Fokus Coding Malam', settings: { musicVolume: 75 } },
      { _id: '2', mixName: 'Hujan Sore Santai', settings: { musicVolume: 60 } },
      { _id: '3', mixName: 'Kerja di Kafe', settings: { musicVolume: 80 } },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {


       const tracksResponse = await fetch(`${apiUrl}/api/track`);
       const ambienceResponse = await fetch(`${apiUrl}/api/ambience`);
            
        const tracksData = await tracksResponse.json();
        const ambienceData = await ambienceResponse.json();
        setMusicTracks(tracksData);
        setAmbienceSounds(ambienceData);
      } catch (error) {
        console.error("Gagal mengambil data dari server:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout
            musicTracks={musicTracks}
            ambienceSounds={ambienceSounds}
            myMixes={myMixes}
            setMyMixes={setMyMixes} // Kirim juga fungsi set-nya jika dibutuhkan di child
          />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/credits"
          element={<CreditsPage musicTracks={musicTracks} ambienceSounds={ambienceSounds} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
