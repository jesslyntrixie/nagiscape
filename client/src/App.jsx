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
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
const apiUrl = import.meta.env.VITE_API_BASE_URL;





function MainLayout({ musicTracks, ambienceSounds, myMixes, setMyMixes, user, onAuthSuccess, onLogout }) {

  // States --------------------------------------------------------------
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSaveMixModalOpen, setSaveMixModalOpen] = useState(false);
  const [isAppPlaying, setIsAppPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(70);
  const [ambienceVolumes, setAmbienceVolumes] = useState({});
  const [currentMixName, setCurrentMixName] = useState('');
  // ---------------------------------------------------------------------


  const musicAudioRef = useRef(new Audio());
  const ambienceAudioRefs = useRef({});


  // functions -----------------------------------------------------------

  const toggleGlobalPlayPause = () => {
    setIsAppPlaying(prev => !prev);
  };

const handleTrackSelect = (track) => {
    setCurrentMixName('');
    const fullTrackUrl = `${apiUrl}${track.url}`;
    
    const isSameTrack = currentTrack?._id === track._id;

    if (isSameTrack && isMusicPlaying) {
      setIsMusicPlaying(false); 
    } else {
      setCurrentTrack(track);
      if (musicAudioRef.current.src !== fullTrackUrl) {
        musicAudioRef.current.src = fullTrackUrl;
      }
      setIsMusicPlaying(true); 
      setIsAppPlaying(true);   
    }
  };

  const handleAmbienceVolumeChange = (soundId, volume) => {
    setAmbienceVolumes(prev => ({ ...prev, [soundId]: parseInt(volume) }));
    if (!ambienceAudioRefs.current[soundId]) {
      const soundData = ambienceSounds.find(s => s._id === soundId);
      if (soundData) {
        const fullSoundUrl = `${apiUrl}${soundData.url}`;
        const audio = new Audio(fullSoundUrl);
        audio.loop = true;
        ambienceAudioRefs.current[soundId] = audio;
      }
    }
  };

  const handleSaveMixClick = () => user ? setSaveMixModalOpen(true) : setAuthModalOpen(true);

  const saveMixToServer = async (mixName) => {
    const token = localStorage.getItem('authToken');
    if (!token) return console.error("No auth token found.");

    const settings = {
      musicTrackId: currentTrack ? currentTrack._id : null,
      musicVolume, 
      ambienceVolumes
    };

    try {
      const response = await fetch(`${apiUrl}/api/mixes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({mixName, settings})
      });
      const newMix = await response.json();
      if (response.ok){
        setMyMixes(prevMixes => [...prevMixes, newMix]);
      } else {
        throw new Error(newMix.message || 'Failed to save mix');
      }
    } catch (error) {
      console.error("Error saving mix: ", error);
    }
  };




const loadMixSettings = (settings, mixName) => {
    if (!settings) {
      console.error("Attempted to load mix with invalid settings.");
      return;
    }
    // 1. Buat objek dasar di mana SEMUA volume ambience diatur ke 0.
    const resetAmbienceVolumes = {};
    ambienceSounds.forEach(sound => {
      resetAmbienceVolumes[sound._id] = 0;
    });

    // 2. Gabungkan objek reset dengan settings dari mix baru.
    // Ini memaksa suara dari mix lama yang tidak ada di mix baru untuk memiliki volume 0.
    const newAmbienceVolumes = { ...resetAmbienceVolumes, ...(settings.ambienceVolumes || {}) };
    
    setAmbienceVolumes(newAmbienceVolumes);

    setCurrentMixName(mixName || 'Loaded Mix');
    setMusicVolume(settings.musicVolume || 70);

    const hasMusic = !!settings.musicTrackId;
    setIsMusicPlaying(hasMusic);

    if (hasMusic) {
        const trackToLoad = musicTracks.find(t => t._id === settings.musicTrackId);
        if (trackToLoad) {
          setCurrentTrack(trackToLoad);
        } else {
          setCurrentTrack(null);
          setIsMusicPlaying(false);
        }
    } else {
        setCurrentTrack(null);
    }
    
    const hasAmbience = Object.values(newAmbienceVolumes).some(v => v > 0);
    setIsAppPlaying(hasMusic || hasAmbience);
};

const deleteMix = async (mixId) => {
    const token = localStorage.getItem('authToken');
    if (!token) return console.error("No auth token found.");
    if (!window.confirm("Are you sure?")) return;
    try {
        const response = await fetch(`${apiUrl}/api/mixes/${mixId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if(response.ok) {
            setMyMixes(prevMixes => prevMixes.filter(mix => mix._id !== mixId));
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete mix.');
        }
    } catch (error) {
        console.error("Error deleting mix:", error);
    }
  };

  const handleMusicVolumeChange = (volume) => {
    setMusicVolume(parseInt(volume));
  };


  // ----------------------------------------------------------------------------


  // useeffects/ listeners ------------------------------------------------------


useEffect(() => {
  const audio = musicAudioRef.current;
  const shouldPlayMusic = isAppPlaying && isMusicPlaying && currentTrack;

  if (shouldPlayMusic) {
    const fullTrackUrl = `${apiUrl}${currentTrack.url}`;
    
    // If the audio source is not the correct one, update it.
    if (audio.src !== fullTrackUrl) {
      audio.src = fullTrackUrl;
    }
    
    // Attempt to play the audio.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  } else {
    // If conditions to play are not met, pause the audio.
    audio.pause();
    
    // If no track is selected, clear the audio source to free up memory.
    if (!currentTrack && audio.src) {
        audio.src = '';
        audio.removeAttribute('src');
    }
  }
}, [currentTrack, isAppPlaying, isMusicPlaying]); 



useEffect(() => {
  Object.entries(ambienceVolumes).forEach(([soundId, volume]) => {
    let audio = ambienceAudioRefs.current[soundId];

    if (!audio && volume > 0) {
      const soundData = ambienceSounds.find(s => s._id === soundId);
      if (soundData) {
        const fullSoundUrl = `${apiUrl}${soundData.url}`;
        const newAudio = new Audio(fullSoundUrl);
        newAudio.loop = true;
        ambienceAudioRefs.current[soundId] = newAudio;
        audio = newAudio;
      }
    }

    if (audio) {
      audio.volume = volume / 100;

      if (isAppPlaying && volume > 0) {
        audio.play().catch(error => console.error(`Failed to play ambience ${soundId}:`, error));
      } else {
        audio.pause();
      }
    }
  });

  // Cleanup function sebagai jaring pengaman terakhir
  return () => {
    if (!isAppPlaying) {
      Object.values(ambienceAudioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
        }
      });
    }
  };
}, [isAppPlaying, ambienceVolumes, ambienceSounds, apiUrl]);


const isDisabled = !isAppPlaying;

useEffect(() => {
    musicAudioRef.current.volume = musicVolume / 100;
  }, [musicVolume]); 

useEffect(() => {
    musicAudioRef.current.loop = true;
  }, []);


  // -------------------------------------------------------------------------


  return (
    <div className="container">
      <Header
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogout={onLogout}
        myMixes={myMixes}
        onLoadMix={loadMixSettings}
        onDeleteMix={deleteMix}
      />
      <main className="main-content">
        <MusicPlayer 
          tracks={musicTracks} 
          currentTrack={currentTrack}
          isPlaying={isMusicPlaying && isAppPlaying}
          onTrackSelect={handleTrackSelect}
          musicVolume={musicVolume}
          onMusicVolumeChange={handleMusicVolumeChange}
          disabled={isDisabled}
        />
         <AmbienceMixer 
          sounds={ambienceSounds} 
          volumes={ambienceVolumes}
          onVolumeChange={handleAmbienceVolumeChange}
          disabled={isDisabled}
        />
      </main>
      <PlayerBar 
        currentTrack={currentTrack} 
        isMusicPlaying={isMusicPlaying}
        isAppPlaying={isAppPlaying}
        onSaveMixClick={handleSaveMixClick} 
        onPlayPauseClick={toggleGlobalPlayPause}
        currentMixName={currentMixName}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(userData) => {
            onAuthSuccess(userData);
            setAuthModalOpen(false);
        }}
      />
      <SaveMixModal
        isOpen={isSaveMixModalOpen}
        onClose={() => setSaveMixModalOpen(false)}
        onSave={saveMixToServer}
      />
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
  const [user, setUser] = useState(null);
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


  
  const handleAuthSuccess = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setMyMixes([]);
  };

  useEffect(() => {
    const verifyUserSession = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Ganti endpoint '/api/auth/profile' sesuai dengan endpoint backend Anda
          const response = await fetch(`${apiUrl}/api/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user); // Atur state user jika token valid
          } else {
            localStorage.removeItem('authToken'); // Hapus token jika tidak valid
          }
        } catch (error) {
          console.error("Session verification failed:", error);
          localStorage.removeItem('authToken');
        }
      }
    };
    verifyUserSession();
  }, []);



  // fungsi untuk load mixes data dari user setelah login. 
  // memiliki dependensi user, artinya akan dijalankan tiap nilau user berubah (kalau login kan null -> not null atau logout kan sebaliknya, tp di logout udh ada kode utk clear mymixes)
  useEffect(() => {
    const fetchUserMixes = async () => {
        if (user) {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`${apiUrl}/api/mixes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if(response.ok) setMyMixes(data);
                else console.error("Failed to fetch mixes:", data.message);
            } catch (error) {
                console.error("Error fetching mixes:", error);
            }
        }
    };
    fetchUserMixes();
  }, [user]);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout
            musicTracks={musicTracks} ambienceSounds={ambienceSounds}
            myMixes={myMixes} setMyMixes={setMyMixes}
            user={user} onAuthSuccess={handleAuthSuccess} onLogout={handleLogout}
          />}
        />
        <Route path="/settings" element={<SettingsPage onLogout={handleLogout}/>} />
        <Route
          path="/credits"
          element={<CreditsPage musicTracks={musicTracks} ambienceSounds={ambienceSounds} />}
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
