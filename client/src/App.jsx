import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import AmbienceMixer from './components/AmbienceMixer.jsx';
import PlayerBar from './components/PlayerBar.jsx';
import AuthModal from './components/AuthModal.jsx';
import SaveMixModal from './components/SaveMixModal.jsx';
import SettingsPage from './components/SettingsPage';
import CreditsPage from './components/CreditsPage.jsx';
// ⛔️ HAPUS: Import dari server tidak diperbolehkan di client-side React
// import User from '../../server/models/User.js';

// ✅ BENAR: Terima props sebagai satu objek dan langsung destructuring
function MainLayout({ musicTracks, ambienceSounds, myMixes, setMyMixes }) {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSaveMixModalOpen, setSaveMixModalOpen] = useState(false);
  const [isMyMixesModalOpen, setMyMixesModalOpen] = useState(false);
  const [user, setUser] = useState(null); // State user tetap di sini untuk UI

  const handleSaveMixClick = () => {
    const userIsLoggedIn = true; // Ganti dengan logika user sungguhan nanti

    if (userIsLoggedIn) {
      setSaveMixModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const saveMixToServer = (mixName) => {
    console.log(`Menyimpan mix dengan nama: "${mixName}"`);
    // TODO: LOGIKA SAVE KE BACKEND
  };

  const loadMixSettings = (settings) => {
    console.log('Memuat settings:', settings);
    setMyMixesModalOpen(false);
  };

  const deleteMix = (mixId) => {
    console.log('--- LOGIKA DELETE MIX API DISINI ---', mixId);
    // Setelah berhasil hapus di server, update state di frontend
    setMyMixes(myMixes.filter(mix => mix._id !== mixId));
  };

  // ⛔️ HAPUS: Data dummy ini sudah tidak diperlukan karena data diambil dari props
  // const tracks=[...];

  return (
    <div className="container">
      <Header
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        myMixes={myMixes} // Gunakan myMixes dari props
        onLoadMix={loadMixSettings}
        onDeleteMix={deleteMix}
      />
      <main className="main-content">
        <MusicPlayer tracks={musicTracks} />
        <AmbienceMixer sounds={ambienceSounds} />
      </main>
      <PlayerBar onSaveMixClick={handleSaveMixClick} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
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
  // ✅ BENAR: State untuk data utama aplikasi diletakkan di komponen paling atas (App)
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
        const tracksResponse = await fetch('/api/track');
        const ambienceResponse = await fetch('/api/ambience');
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
        {/* ✅ BENAR: Kirim semua data dan fungsi yang dibutuhkan sebagai props */}
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
